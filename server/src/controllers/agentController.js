import { ethers } from "ethers";
import {
  createNewAgent,
  getAgentByName,
  getUserByAddress,
} from "../utils/convex.js";
import { createPrivyWallet } from "../utils/privy.js";
import daos from "../utils/daoConfig.js";
import tagList from "../utils/tagList.js";
import { checkProfile, getTwitterPosts } from "../utils/twitter.js";
import { createTwitterCharacterProfile } from "../utils/openai.js";
import { setNamestoneDomain } from "../utils/nameStone.js";

const createAgent = async (req, res) => {
  try {
    const {
      name,
      imageUrl,
      imageType,
      daoId,
      profileType,
      visibility,
      delayPeriod,
      twitterId,
      tags,
      importProfile,
      walletAddress,
      chainId,
      signature,
    } = req.body;

    if (
      !name ||
      !daoId ||
      !profileType ||
      !delayPeriod ||
      !walletAddress ||
      !chainId ||
      !signature
    ) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const dao = daos.find((dao) => dao.id === daoId);

    if (!dao) {
      return res.json({
        success: false,
        message: "Invalid DAO ID",
      });
    }

    const domain = {
      name: "minervagov.eth",
      version: "1",
      chainId: chainId,
      verifyingContract: process.env.MINERVA_GOV_ADDRESS,
    };

    const types = {
      NewAgent: [
        { name: "name", type: "string" },
        { name: "daoId", type: "string" },
        { name: "profileType", type: "string" },
        { name: "visibility", type: "bool" },
        { name: "delayPeriod", type: "uint256" },
        { name: "walletAddress", type: "address" },
      ],
    };

    const message = {
      name,
      daoId,
      profileType,
      visibility,
      delayPeriod,
      walletAddress,
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

    const user = await getUserByAddress(walletAddress);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const { id, address } = await createPrivyWallet();

    let twitterProfile = undefined;

    if (profileType === "twitter") {
      const twitterPosts = await getTwitterPosts(twitterId);

      if (twitterPosts.length === 0) {
        return res.json({
          success: false,
          message: "No posts found",
        });
      }
      const characterProfile = await createTwitterCharacterProfile(
        twitterPosts
      );

      twitterProfile = {
        twitterId,
        charProfile: characterProfile,
      };
    } else if (profileType === "tags") {
      if (!tags) {
        return res.json({
          success: false,
          message: "Tags are required",
        });
      }

      if (tags.length < 2 || tags.length > 5) {
        return res.json({
          success: false,
          message: "Tags must be between 2 and 5",
        });
      }

      const validTags = tags.filter((tag) => tagList.includes(tag));

      if (validTags.length !== tags.length) {
        return res.json({
          success: false,
          message: "Invalid tags",
        });
      }
    } else {
      const importAgent = await getAgentByName(importProfile);

      if (!importAgent) {
        return res.json({
          success: false,
          message: `Agent ${name} not found`,
        });
      }

      if (importAgent.createdBy !== user._id) {
        return res.json({
          success: false,
          message: "You are not authorized to import this agent",
        });
      }

      if (importAgent.name === name) {
        return res.json({
          success: false,
          message: "You cannot import your own agent",
        });
      }

      if (importAgent.visibility === "private") {
        return res.json({
          success: false,
          message: "You cannot import a private agent",
        });
      }
    }

    const agent = await createNewAgent({
      name,
      imageUrl,
      imageType,
      createdBy: user._id,
      privyWalletId: id,
      daoId,
      profileType,
      visibility: visibility === "true" ? "public" : "private",
      delayPeriod: parseInt(delayPeriod),
      tags,
      importProfile,
      twitterProfile,
    });

    await setNamestoneDomain(name, address);

    return res.json({
      success: true,
      message: "Agent created successfully",
      agent,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error creating agent",
      error: error.message,
    });
  }
};

const checkTwitterProfile = async (req, res) => {
  try {
    const { twitterId } = req.query;

    if (!twitterId) {
      return res.json({
        success: false,
        message: "Twitter ID is required",
      });
    }

    const profile = await checkProfile(twitterId);

    if (!profile) {
      return res.json({
        success: false,
        message: "Twitter profile not found",
      });
    }

    return res.json({
      success: true,
      profile,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error checking twitter profile",
      error: error.message,
    });
  }
};

const getAgentByAgentName = async (req, res) => {
  try {
    const { agentName } = req.params;

    const agent = await getAgentByName(agentName.toLowerCase());

    if (!agent) {
      return res.json({
        success: false,
        message: "Agent not found",
      });
    }

    return res.json({
      success: true,
      agent,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error getting agent by name",
      error: error.message,
    });
  }
};

const testTwitterCharacterProfile = async (req, res) => {
  const twitterPosts = await getTwitterPosts("Anoyroyc");
  const characterProfile = await createTwitterCharacterProfile(twitterPosts);
  return res.json({
    characterProfile,
  });
};

export {
  createAgent,
  testTwitterCharacterProfile,
  checkTwitterProfile,
  getAgentByAgentName,
};
