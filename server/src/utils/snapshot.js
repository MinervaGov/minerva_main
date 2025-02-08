import axios from "axios";
import daos from "./daoConfig.js";
import dotenv from "dotenv";
import redis from "./redis.js";
import {
  addBulkDecision,
  addProposal,
  getAgentsByDaoId,
  getDecisionsByStatus,
} from "./convex.js";
import { summarizeProposal } from "./openai.js";
import { decisionQueue } from "./Queue.js";

dotenv.config();

const fetchDaoData = async (daoId) => {
  const currentDao = daos.find((dao) => dao.id === daoId);

  if (!currentDao) {
    throw new Error("DAO not found");
  }

  const snapshotSpace = currentDao.snapshotSpace;

  const query = `
    query Proposals {
      proposals(
        first: 1,
        skip: 0,
        where: {
          space_in: ["${snapshotSpace}"],
        },
        orderBy: "created",
        orderDirection: desc
      ) {
        id
        title
        body
        choices
        start
        end
        snapshot
        state
        author
        space {
          id
          name
        }
      }
    }
  `;

  const response = await axios.post(
    process.env.SNAPSHOT_API_URL,
    { query },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const proposals = response.data.data.proposals;

  if (proposals.length === 0) {
    return null;
  }

  return proposals[0];
};

const loadDaoProposals = async () => {
  try {
    await Promise.all(
      daos.map(async (dao) => {
        const proposals = await fetchDaoData(dao.id);

        if (!proposals) {
          redis.set("LatestProposal:" + dao.id, null);
          return;
        }

        redis.set("LatestProposal:" + dao.id, proposals.id);
      })
    );
  } catch (e) {
    return null;
  }
};

const listenForProposals = async () => {
  console.log("Listening for proposals");

  setInterval(async () => {
    daos.forEach(async (dao) => {
      try {
        const latestProposal = await redis.get("LatestProposal:" + dao.id);

        const currentProposal = await fetchDaoData(dao.id);

        if (!currentProposal) {
          return;
        }

        if (!latestProposal || latestProposal !== currentProposal.id) {
          redis.set("LatestProposal:" + dao.id, currentProposal.id);
          console.log("New proposal detected for " + dao.snapshotSpace);

          const aiSummary = await summarizeProposal(currentProposal.body);

          const proposalId = await addProposal({
            snapshotId: currentProposal.id,
            daoId: dao.id,
            title: currentProposal.title,
            description: currentProposal.body,
            choices: currentProposal.choices,
            endDate: parseInt(currentProposal.end),
            aiSummary: aiSummary,
          });

          const agents = await getAgentsByDaoId(dao.id);

          const agentIds = agents.map((agent) => agent._id);

          const decisionIds = await addBulkDecision(proposalId, agentIds);

          decisionIds.forEach((decisionId) => {
            decisionQueue.add({ decisionId });
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, 60000);
};

const loadPendingDecisions = async () => {
  const decisions = await getDecisionsByStatus("pending");

  decisions.forEach((decision) => {
    decisionQueue.add({ decisionId: decision._id });
  });

  console.log(`Loaded ${decisions.length} pending decisions`);
};

export {
  fetchDaoData,
  loadDaoProposals,
  listenForProposals,
  loadPendingDecisions,
};
