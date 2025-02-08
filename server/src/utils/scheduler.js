import { z } from "zod";
import axios from "axios";
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpTool, CdpToolkit } from "@coinbase/cdp-langchain";

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
  try {
    const { decisionId } = CastVoteInput.parse(args);

    console.log(decisionId);

    return true;
  } catch (error) {
    console.log(error);
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

  console.log(response);
};

export { processScheduledDecisions };
