import { ethers } from "ethers";
import chains from "../lib/chainConfig.js";
import daos from "./daoConfig.js";

const getArbitrumVotingPower = async (walletAddress, daoId) => {
  const dao = daos.find((dao) => dao.id === daoId);

  if (!dao) {
    throw new Error("DAO not found");
  }

  const chain = chains.find((chain) => chain.id === dao.chainId);

  if (!chain) {
    throw new Error("Chain not found");
  }

  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

  const arbToken = new ethers.Contract(
    dao.deployments.arbToken.address,
    dao.deployments.arbToken.abi,
    provider
  );

  const votingPower = Number(
    (await arbToken.getVotes(walletAddress)) / 10 ** 18
  );

  return votingPower;
};

const getArbitrumDelegates = async (walletAddress, daoId) => {
  const dao = daos.find((dao) => dao.id === daoId);

  if (!dao) {
    throw new Error("DAO not found");
  }

  const chain = chains.find((chain) => chain.id === dao.chainId);

  if (!chain) {
    throw new Error("Chain not found");
  }

  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

  const arbToken = new ethers.Contract(
    dao.deployments.arbToken.address,
    dao.deployments.arbToken.abi,
    provider
  );

  const delegates = await arbToken.delegates(walletAddress);

  return delegates;
};

const getArbitrumDelegatePayload = async (targetAddress, daoId) => {
  const dao = daos.find((dao) => dao.id === daoId);

  if (!dao) {
    throw new Error("DAO not found");
  }

  const chain = chains.find((chain) => chain.id === dao.chainId);

  if (!chain) {
    throw new Error("Chain not found");
  }

  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

  const arbToken = new ethers.Contract(
    dao.deployments.arbToken.address,
    dao.deployments.arbToken.abi,
    provider
  );

  const data = arbToken.interface.encodeFunctionData("delegate", [
    targetAddress,
  ]);

  return {
    contractAddress: dao.deployments.arbToken.address,
    delegatePayload: data,
  };
};

export {
  getArbitrumVotingPower,
  getArbitrumDelegates,
  getArbitrumDelegatePayload,
};
