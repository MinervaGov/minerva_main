import { z } from "zod";
import axios from "axios";
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpTool, CdpToolkit } from "@coinbase/cdp-langchain";
import {
  changeDecisionStatus,
  setPrimaryDecision,
  getUsersToNotify,
} from "./convex.js";
import { scheduleDecisions } from "./scheduler.js";
import { notifyDecisionTG } from "./tg.js";
import { notifyDecisionDiscord } from "./discordBot.js";

dotenv.config();

const GAIA_PROMPT = `
You are a helpful assistant that can help with the following tasks:
- Takes in Dao Id, Proposal Details, Decision Criteria, Character Profile or Tags and Response format
- Relays the information to the Gaia API
- Gets the output from the API
- Returns only the first json object in the response
- Returns the output in a json format, and nothing else
- Removes names from the Character profile from the reason, and provides pure reason.
- Remove any names from the reason, and provide pure reason
- **Provide the output given by the tool as it is, and nothing else**
- **Convert the Vote into an integer if not provided as an integer**
- If you find any names in the reason, replace them with **Minerva**
`;

const GaiaMessageInput = z
  .object({
    daoId: z.string().describe("Dao Id"),
    proposalDetails: z.string().describe("Proposal Details"),
    decisionCriteria: z.string().describe("Decision Criteria"),
    characterProfile: z.string().describe("Character Profile"),
    tags: z.string().describe("Tags"),
    responseFormat: z.string().describe("Response Format"),
  })
  .strip()
  .describe("Gaia Message Input");

async function getGaiaMessage(wallet, args) {
  try {
    const {
      daoId,
      proposalDetails,
      decisionCriteria,
      characterProfile,
      tags,
      responseFormat,
    } = GaiaMessageInput.parse(args);

    const body = {
      messages: [
        {
          role: "user",
          content: `You are given a proposal from ${daoId} DAO. Your task is to determine the appropriate vote based on the provided character profile. The voting type and available choices are also specified—select the most suitable option accordingly.
                ### **Proposal Details:**
                ${proposalDetails}
                ### **Decision Criteria:**
                ${decisionCriteria}
                ### **Character Profile:**
                ${characterProfile}
                ### **Tags:**
                ${tags}
                ### **Response Format:**  
                Reply in the following **JSON format**:
                ${responseFormat}

                Give the output in only JSON format, and nothing else
                `,
        },
      ],
    };

    const response = await axios({
      method: "post",
      url: `${process.env.GAIA_API_URL}/v1/chat/completions`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(body),
    });

    return response.data.choices[0].message.content;
  } catch (err) {
    console.log(err);
  }
}

async function initializeAgent() {
  try {
    const llm = new ChatOpenAI({
      model: "gpt-4o-mini",
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
    const getGaiaMessageTool = new CdpTool(
      {
        name: "get_gaia_message",
        description: GAIA_PROMPT,
        argsSchema: GaiaMessageInput,
        func: getGaiaMessage,
      },
      agentkit
    );
    tools.push(getGaiaMessageTool);

    // Store buffered conversation history in memory
    const agentConfig = {
      configurable: {
        thread_id: `CDP AgentKit Gaia Simplifier`,
      },
    };

    // Create React Agent using the LLM and CDP AgentKit tools
    const agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: undefined,
      messageModifier:
        "You are a helpful agent that can simplify the proposal details and decision criteria based on the character profile and tags.",
    });

    return { agent, config: agentConfig, agentkit };
  } catch (error) {
    console.error("Failed to initialize agent:", error);
    throw error;
  }
}

const getFinalDecision = async (decisionId, proposal, agentInput) => {
  try {
    const { agent, config } = await initializeAgent();

    const message = `get_gaia_message
  
  Here is the Gaia Message:
    - Dao Id : ${proposal.daoId}

    - Proposal Details : 
        title : ${proposal.title}
        description : ${proposal.description}
        Voting Choices : ${proposal.choices}
        Voting Type : Single Choice Voting
    
    - Decision Criteria : 
      1. Your vote must align **strictly** with the given character profile.
      2. Consider the **sentiment, personality traits, and interests** of the character when making a decision.
      3. Provide a well-reasoned justification for your vote based on the character's profile.
      4. Do not introduce personal bias—your decision should be objective and profile-driven.
      ${
        agentInput.profileType === "twitter"
          ? `
      - Character Profile : ${agentInput.twitterProfile.charProfile}

      - Tags : Based on Character Profile
      `
          : `
      - Character Profile : Based on Tags
    
      - Tags : ${agentInput.tags}
      `
      }
      - Response Format : 
      {
        "vote": "<index of the chosen option (starting from 1)>",
        "reason": "<Your justification for this vote>"
      }
  `;

    const stream = await agent.stream(
      { messages: [new HumanMessage(message)] },
      config
    );

    let response = "";

    for await (const chunk of stream) {
      if ("agent" in chunk) {
        //response += chunk.agent.messages[0].content;
      } else if ("tools" in chunk) {
        response += chunk.tools.messages[0].content;
      }
    }

    console.log("Response", response);

    const parsedResponse = parseVoteResponse(response);

    if (parsedResponse === null) {
      throw new Error("Response can't be parsed");
    }

    await setPrimaryDecision(
      decisionId,
      parsedResponse.vote.toString(),
      parsedResponse.reason
    );

    const usersToNotify = await getUsersToNotify(proposal.daoId, agentInput._id);
    await notifyDecisionTG(
      usersToNotify,
      proposal.title,
      proposal.choices,
      parsedResponse
    );
    await notifyDecisionDiscord(
      usersToNotify,
      proposal.title,
      proposal.choices,
      parsedResponse
    );

    console.log("Decision Processed");

    await scheduleDecisions(decisionId);

    return {
      success: true,
      vote: parsedResponse.vote,
      reason: parsedResponse.reason,
      message: "Decision Processed Successfully",
    };
  } catch (error) {
    console.log("Decision Failed to process", error);
    await changeDecisionStatus(decisionId, "failed");

    return {
      success: false,
      message: "Decision Failed to process",
    };
  }
};

function parseVoteResponse(response) {
  try {
    // Find the JSON content between the first { and last }
    const jsonMatch = response.match(/{[\s\S]*}/);

    if (!jsonMatch) {
      throw new Error("No valid JSON found in the response");
    }

    // Parse the extracted JSON
    const parsedData = JSON.parse(jsonMatch[0]);

    return {
      vote: parsedData.vote,
      reason: parsedData.reason,
      // Add additional fields as needed
    };
  } catch (error) {
    return null;
  }
}

export { getFinalDecision };
