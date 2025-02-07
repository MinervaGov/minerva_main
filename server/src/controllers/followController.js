import { ethers } from "ethers";
import {
  followAgent as followAgentConvex,
  unfollowAgent as unfollowAgentConvex,
  getFollowers as getFollowersConvex,
  getFollowedAgents as getFollowedAgentsConvex,
  getUserByAddress,
  getAgentByName,
} from "../utils/convex.js";

const followAgent = async (req, res) => {
  try {
    const { walletAddress, agentName, chainId, signature } = req.body;

    if (!walletAddress || !agentName || !chainId || !signature) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await getUserByAddress(walletAddress);

    const agent = await getAgentByName(agentName);

    if (!user || !agent) {
      return res.json({
        success: false,
        message: "User or agent not found",
      });
    }

    const domain = {
      name: "minervagov.eth",
      version: "1",
      chainId: chainId,
      verifyingContract: process.env.MINERVA_GOV_ADDRESS,
    };

    const types = {
      FollowAgent: [
        { name: "walletAddress", type: "address" },
        { name: "agentName", type: "string" },
      ],
    };

    const message = {
      walletAddress,
      agentName,
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

    await followAgentConvex(user._id, agent._id);

    return res.json({
      success: true,
      message: "Agent followed successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const unfollowAgent = async (req, res) => {
  try {
    const { walletAddress, agentName, chainId, signature } = req.body;

    if (!walletAddress || !agentName || !chainId || !signature) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await getUserByAddress(walletAddress);

    const agent = await getAgentByName(agentName);

    if (!user || !agent) {
      return res.json({
        success: false,
        message: "User or agent not found",
      });
    }

    const domain = {
      name: "minervagov.eth",
      version: "1",
      chainId: chainId,
      verifyingContract: process.env.MINERVA_GOV_ADDRESS,
    };

    const types = {
      UnfollowAgent: [
        { name: "walletAddress", type: "address" },
        { name: "agentName", type: "string" },
      ],
    };

    const message = {
      walletAddress,
      agentName,
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

    await unfollowAgentConvex(user._id, agent._id);

    return res.json({
      success: true,
      message: "Agent unfollowed successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
const getFollowers = async (req, res) => {
  try {
    const { agentId } = req.params;

    const followers = await getFollowersConvex(agentId);

    return res.json({
      success: true,
      followers,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const getFollowedAgents = async (req, res) => {
  try {
    const { userId } = req.params;

    const followedAgents = await getFollowedAgentsConvex(userId);

    return res.json({
      success: true,
      followedAgents,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { followAgent, unfollowAgent, getFollowers, getFollowedAgents };
