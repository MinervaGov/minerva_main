import {
  getArbitrumDelegatePayload,
  getArbitrumDelegates,
  getArbitrumVotingPower,
} from "../utils/dao.js";

const getVp = async (req, res) => {
  try {
    const { daoId, walletAddress } = req.params;

    let votingPower;

    if (daoId === "arbitrum") {
      votingPower = await getArbitrumVotingPower(walletAddress, daoId);
    }

    return res.json({
      success: true,
      votingPower,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const getDelegates = async (req, res) => {
  try {
    const { daoId, walletAddress } = req.params;

    let delegates;

    if (daoId === "arbitrum") {
      delegates = await getArbitrumDelegates(walletAddress, daoId);
    }

    return res.json({
      success: true,
      delegates,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const getDelegatePayload = async (req, res) => {
  try {
    const { daoId, targetAddress } = req.params;

    if (daoId === "arbitrum") {
      const {
        contractAddress,
        delegatePayload,
      } = await getArbitrumDelegatePayload(targetAddress, daoId);

      return res.json({
        success: true,
        delegatePayload,
        contractAddress,
      });
    } else {
      return res.json({
        success: false,
        message: "DAO not found",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { getVp, getDelegates, getDelegatePayload };
