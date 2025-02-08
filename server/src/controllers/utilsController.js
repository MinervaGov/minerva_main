import dotenv from "dotenv";
import { ethers } from "ethers";
import {
  getAgentById,
  getDecisionById,
  getProposalById,
  getUserByAddress,
  disputeDecision as disputeDecisionConvex,
} from "../utils/convex.js";
import { getFinalDecision } from "../utils/VoteParser.js";

dotenv.config();

const reEvaluate = async (req, res) => {
  try {
    const { decisionId, walletAddress, chainId, signature } = req.body;

    if (!decisionId || !chainId || !signature) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const domain = {
      name: "minervagov.eth",
      version: "1",
      chainId: chainId,
      verifyingContract: process.env.MINERVA_GOV_ADDRESS,
    };

    const types = {
      ReEvaluate: [{ name: "decisionId", type: "string" }],
    };

    const message = {
      decisionId,
    };

    const recoveredAddress = ethers.utils.verifyTypedData(
      domain,
      types,
      message,
      signature
    );

    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.json({
        success: false,
        message: "Invalid signature",
      });
    }

    const decision = await getDecisionById(decisionId);

    if (!decision) {
      return res.json({
        success: false,
        message: "Decision not found",
      });
    }

    const agent = await getAgentById(decision.agentId);

    if (!agent) {
      return res.json({
        success: false,
        message: "Agent not found",
      });
    }

    const user = await getUserByAddress(walletAddress);

    if (agent.createdBy !== user._id) {
      return res.json({
        success: false,
        message: "You are not the creator of this agent",
      });
    }

    const proposal = await getProposalById(decision.proposalId);

    if (!proposal) {
      return res.json({
        success: false,
        message: "Proposal not found",
      });
    }

    const {
      success,
      vote,
      reason,
      message: finalMessage,
    } = await getFinalDecision(decisionId, proposal, agent);

    if (!success) {
      return res.json({
        success: false,
        message: finalMessage,
      });
    }

    return res.json({
      success: true,
      vote,
      reason,
      message: "Decision re-evaluated successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error re-evaluating decision",
    });
  }
};

const disputeDecision = async (req, res) => {
  try {
    const {
      decisionId,
      finalDecision,
      walletAddress,
      chainId,
      signature,
    } = req.body;

    if (
      !decisionId ||
      !chainId ||
      !signature ||
      !finalDecision ||
      !walletAddress
    ) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const domain = {
      name: "minervagov.eth",
      version: "1",
      chainId: chainId,
      verifyingContract: process.env.MINERVA_GOV_ADDRESS,
    };

    const types = {
      Dispute: [
        { name: "decisionId", type: "string" },
        { name: "finalDecision", type: "string" },
      ],
    };

    const message = {
      decisionId,
      finalDecision,
    };

    const recoveredAddress = ethers.utils.verifyTypedData(
      domain,
      types,
      message,
      signature
    );

    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.json({
        success: false,
        message: "Invalid signature",
      });
    }

    const decision = await getDecisionById(decisionId);

    if (!decision) {
      return res.json({
        success: false,
        message: "Decision not found",
      });
    }

    if (decision.FinalDecision) {
      return res.json({
        success: false,
        message: "Decision already has a final decision",
      });
    }

    const agent = await getAgentById(decision.agentId);

    if (!agent) {
      return res.json({
        success: false,
        message: "Agent not found",
      });
    }

    const user = await getUserByAddress(walletAddress);

    if (agent.createdBy !== user._id) {
      return res.json({
        success: false,
        message: "You are not the creator of this agent",
      });
    }

    await disputeDecisionConvex(decisionId, finalDecision);

    return res.json({
      success: true,
      message: "Decision disputed successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error disputing decision",
    });
  }
};
export { reEvaluate, disputeDecision };
