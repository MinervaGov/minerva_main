import { z } from "zod";
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpTool, CdpToolkit } from "@coinbase/cdp-langchain";
import {
  getAgentById,
  getDecisionById,
  getProposalById,
  setExecuted,
} from "./convex.js";
import axios from "axios";
import daos from "./daoConfig.js";
import { PrivyClient } from "@privy-io/server-auth";
import { scheduleQueue } from "./Queue.js";

dotenv.config();

const CAST_VOTE_PROMPT = `
You are a helpful assistant that can help with the following tasks:
- Takes in Decision Id from the user
- Returns boolean value if the vote is casted or not
`;

const CastVoteInput = z
  .object({
    decisionId: z.string().describe("Decision Id"),
  })
  .strip()
  .describe("Cast Vote Input");

async function castVote(wallet, args) {
  const { decisionId } = CastVoteInput.parse(args);
  try {
    const decision = await getDecisionById(decisionId);
    const proposal = await getProposalById(decision.proposalId);
    const agent = await getAgentById(decision.agentId);
    const dao = daos.find((dao) => dao.id === proposal.daoId);

    if (!decision || !proposal || !agent || !dao) {
      return false;
    }

    if (decision.status !== "decided") {
      return false;
    }

    if (
      decision.executed !== "queued" &&
      decision.executed !== "success" &&
      decision.executed !== "failed"
    ) {
      return false;
    }

    if (proposal.endDate < new Date().getTime() / 1000) {
      await setExecuted(decisionId, "missed");
      return false;
    }

    const domain = {
      name: "snapshot",
      version: "0.1.4",
    };

    // Types definition
    const types = {
      Vote: [
        { name: "from", type: "address" },
        { name: "space", type: "string" },
        { name: "timestamp", type: "uint64" },
        { name: "proposal", type: "bytes32" },
        { name: "choice", type: "uint32" },
        { name: "reason", type: "string" },
        { name: "app", type: "string" },
        { name: "metadata", type: "string" },
      ],
    };

    const finalDecision = decision.FinalDecision;

    let message = {};

    if (finalDecision) {
      message = {
        from: agent.walletAddress,
        space: dao.snapshotSpace,
        timestamp: Number((new Date().getTime() / 1000).toFixed(0)),
        proposal: proposal.snapshotId,
        choice: Number(finalDecision),
        reason: "Minerva's Decision (Disputed)",
        app: "minervagov",
        metadata: "{}",
      };
    } else {
      // Message data
      message = {
        from: agent.walletAddress,
        space: dao.snapshotSpace,
        timestamp: Number((new Date().getTime() / 1000).toFixed(0)),
        proposal: proposal.snapshotId,
        choice: Number(decision.primaryDecision),
        reason: decision.primaryReason,
        app: "minervagov",
        metadata: "{}",
      };
    }

    const privy = new PrivyClient(
      process.env.PRIVY_APP_ID,
      process.env.PRIVY_APP_SECRET
    );

    const { signature } = await privy.walletApi.ethereum.signTypedData({
      walletId: agent.privyWalletId,
      typedData: {
        domain,
        types,
        message,
        primaryType: "Vote",
      },
    });

    const response = await axios.post("https://testnet.seq.snapshot.org/", {
      address: agent.walletAddress,
      sig: signature,
      data: {
        domain,
        types,
        message,
      },
    });

    console.log(response.data);

    await setExecuted(decisionId, "success");

    return true;
  } catch (error) {
    console.log(error);
    await setExecuted(decisionId, "failed");
    return false;
  }
}

async function initializeAgent() {
  try {
    const llm = new ChatOpenAI({
      model: "gpt-3.5-turbo",
    });

    // Configure CDP AgentKit
    const config = {
      cdpWalletData: undefined,
      networkId: process.env.NETWORK_ID || "base-sepolia",
    };

    // Initialize CDP AgentKit
    const agentkit = await CdpAgentkit.configureWithWallet(config);

    // Initialize CDP AgentKit Toolkit and get tools
    const cdpToolkit = new CdpToolkit(agentkit);
    const tools = cdpToolkit.getTools();

    // Gaia Message Tool
    const castVoteTool = new CdpTool(
      {
        name: "cast_vote",
        description: CAST_VOTE_PROMPT,
        argsSchema: CastVoteInput,
        func: castVote,
      },
      agentkit
    );
    tools.push(castVoteTool);

    // Store buffered conversation history in memory
    const agentConfig = {
      configurable: {
        thread_id: `CDP AgentKit Cast Vote`,
      },
    };

    // Create React Agent using the LLM and CDP AgentKit tools
    const agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: undefined,
      messageModifier:
        "You are a helpful assistant that returns a (only one) boolean value if the vote is casted or not. Nothing else. No other text.",
    });

    return { agent, config: agentConfig, agentkit };
  } catch (error) {
    console.error("Failed to initialize agent:", error);
    throw error;
  }
}

const processScheduledDecisions = async (decisionId) => {
  try {
    const { agent, config } = await initializeAgent();

    const message = `cast_vote
    
    Decision Id : ${decisionId}
    `;

    const stream = await agent.stream(
      { messages: [new HumanMessage(message)] },
      config
    );

    let response = "";

    for await (const chunk of stream) {
      if ("agent" in chunk) {
        //   response += chunk.agent.messages[0].content;
      } else if ("tools" in chunk) {
        response += chunk.tools.messages[0].content;
      }
    }

    if (response.includes("true")) {
      console.log("Vote casted");
    } else {
      console.log("Vote not casted");
    }
  } catch (error) {
    console.log(error);
  }
};

const scheduleDecisions = async (decisionId) => {
  const pendingDecisions = await scheduleQueue.getJobs(["waiting"]);

  const isDecisionScheduled = pendingDecisions.some(
    (job) => job.data.decisionId === decisionId
  );

  if (isDecisionScheduled) {
    console.log(`Decision ${decisionId} is already scheduled`);
    return;
  }

  const decision = await getDecisionById(decisionId);

  if (!decision) {
    throw new Error("Decision not found");
  }

  const agent = await getAgentById(decision.agentId);
  const proposal = await getProposalById(decision.proposalId);

  if (!agent || !proposal) {
    throw new Error("Agent or Proposal not found");
  }

  if (proposal.endDate < new Date().getTime() / 1000) {
    throw new Error("Proposal has already ended");
  }

  const delay =
    proposal.endDate * 1000 - agent.delayPeriod - new Date().getTime();

  if (delay < 0) {
    console.log(`Decision ${decisionId} is already expired`);
    return;
  }

  await scheduleQueue.add({ decisionId }, { delay });

  console.log(`Decision ${decisionId} scheduled for ${delay}ms`);
};

export { processScheduledDecisions, scheduleDecisions };
