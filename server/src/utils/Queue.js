import Queue from "bull";
import {
  changeDecisionStatus,
  getAgentById,
  getDecisionById,
  getProposalById,
} from "./convex.js";
import { getDecisions } from "../controllers/agentController.js";
import { getFinalDecision } from "./cdp.js";

const decisionQueue = new Queue("decisions", {
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
  },
});

decisionQueue.process(async (job) => {
  try {
    const { decisionId } = job.data;
    await processDecisions(decisionId);
  } catch (error) {
    console.error("Error processing decision:", error);
  }
});

const processDecisions = async (decisionId) => {
  try {
    console.log("Decision Started Processing");

    const decision = await getDecisionById(decisionId);

    const proposal = await getProposalById(decision.proposalId);

    const agent = await getAgentById(decision.agentId);

    await getFinalDecision(decisionId, proposal, agent);
  } catch (error) {
    console.log(error);
    await changeDecisionStatus(decisionId, "failed");
  }
};

export default decisionQueue;
