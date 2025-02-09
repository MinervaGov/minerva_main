import {
  getArbitrumDelegatePayload,
  getArbitrumDelegates,
  getArbitrumVotingPower,
  getLidoDelegatePayload,
  getLidoDelegates,
  getLidoVotingPower,
  getAaveDelegatePayload,
  getAaveDelegates,
  getAaveVotingPower,
} from "../utils/dao.js";

const getVp = async (req, res) => {
  try {
    const { daoId, walletAddress } = req.params;

    let votingPower;

    if (daoId === "arbitrum") {
      votingPower = await getArbitrumVotingPower(walletAddress, daoId);
    } else if (daoId === "lido") {
      votingPower = await getLidoVotingPower(walletAddress, daoId);
    } else if (daoId === "aave") {
      votingPower = await getAaveVotingPower(walletAddress, daoId);
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
    } else if (daoId === "lido") {
      delegates = await getLidoDelegates(walletAddress, daoId);
    } else if (daoId === "aave") {
      delegates = await getAaveDelegates(walletAddress, daoId);
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
    } else if (daoId === "lido") {
      const { contractAddress, delegatePayload } = await getLidoDelegatePayload(
        targetAddress,
        daoId
      );

      return res.json({
        success: true,
        delegatePayload,
        contractAddress,
      });
    } else if (daoId === "aave") {
      const { contractAddress, delegatePayload } = await getAaveDelegatePayload(
        targetAddress,
        daoId
      );

      return res.json({
        success: true,
        delegatePayload,
        contractAddress,
      });
    }

    return res.json({
      success: false,
      message: "DAO not found",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { getVp, getDelegates, getDelegatePayload };
