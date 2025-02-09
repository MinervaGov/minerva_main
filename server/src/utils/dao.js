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

const getLidoVotingPower = async (walletAddress, daoId) => {
  const dao = daos.find((dao) => dao.id === daoId);

  if (!dao) {
    throw new Error("DAO not found");
  }

  const chain = chains.find((chain) => chain.id === dao.chainId);

  if (!chain) {
    throw new Error("Chain not found");
  }

  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

  const lidoDAOToken = new ethers.Contract(
    dao.deployments.lidoDAOToken.address,
    dao.deployments.lidoDAOToken.abi,
    provider
  );

  const votingPower = Number(
    (await lidoDAOToken.balanceOf(walletAddress)) / 10 ** 18
  );

  return votingPower;
};

const getLidoDelegates = async (walletAddress, daoId) => {
  const dao = daos.find((dao) => dao.id === daoId);

  if (!dao) {
    throw new Error("DAO not found");
  }

  const chain = chains.find((chain) => chain.id === dao.chainId);

  if (!chain) {
    throw new Error("Chain not found");
  }

  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

  const delegateRegistry = new ethers.Contract(
    dao.deployments.delegateRegistry.address,
    dao.deployments.delegateRegistry.abi,
    provider
  );

  const delegate = await delegateRegistry.delegation(
    walletAddress,
    "0x6c69646f2d736e617073686f742e657468000000000000000000000000000000"
  );

  return delegate;
};

const getLidoDelegatePayload = async (targetAddress, daoId) => {
  const dao = daos.find((dao) => dao.id === daoId);

  if (!dao) {
    throw new Error("DAO not found");
  }

  const chain = chains.find((chain) => chain.id === dao.chainId);

  if (!chain) {
    throw new Error("Chain not found");
  }

  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

  const delegateRegistry = new ethers.Contract(
    dao.deployments.delegateRegistry.address,
    dao.deployments.delegateRegistry.abi,
    provider
  );

  const data = delegateRegistry.interface.encodeFunctionData("setDelegate", [
    "0x6c69646f2d736e617073686f742e657468000000000000000000000000000000",
    targetAddress,
  ]);

  return {
    contractAddress: dao.deployments.delegateRegistry.address,
    delegatePayload: data,
  };
};

const getAaveVotingPower = async (walletAddress, daoId) => {
  const dao = daos.find((dao) => dao.id === daoId);

  if (!dao) {
    throw new Error("DAO not found");
  }

  const chain = chains.find((chain) => chain.id === dao.chainId);

  if (!chain) {
    throw new Error("Chain not found");
  }

  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

  const aaveToken = new ethers.Contract(
    dao.deployments.aaveToken.address,
    dao.deployments.aaveToken.abi,
    provider
  );

  const votingPower = Number(
    (await aaveToken.getPowerCurrent(walletAddress, 1)) / 10 ** 18
  );

  return votingPower;
};

const getAaveDelegates = async (walletAddress, daoId) => {
  const dao = daos.find((dao) => dao.id === daoId);

  if (!dao) {
    throw new Error("DAO not found");
  }

  const chain = chains.find((chain) => chain.id === dao.chainId);

  if (!chain) {
    throw new Error("Chain not found");
  }

  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

  const aaveToken = new ethers.Contract(
    dao.deployments.aaveToken.address,
    dao.deployments.aaveToken.abi,
    provider
  );

  const delegates = await aaveToken.getDelegateeByType(walletAddress, 1);

  return delegates;
};

const getAaveDelegatePayload = async (targetAddress, daoId) => {
  const dao = daos.find((dao) => dao.id === daoId);

  if (!dao) {
    throw new Error("DAO not found");
  }

  const chain = chains.find((chain) => chain.id === dao.chainId);

  if (!chain) {
    throw new Error("Chain not found");
  }

  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

  const aaveToken = new ethers.Contract(
    dao.deployments.aaveToken.address,
    dao.deployments.aaveToken.abi,
    provider
  );

  const data = aaveToken.interface.encodeFunctionData("delegate", [
    targetAddress,
  ]);

  return {
    contractAddress: dao.deployments.aaveToken.address,
    delegatePayload: data,
  };
};

export {
  getArbitrumVotingPower,
  getArbitrumDelegates,
  getArbitrumDelegatePayload,
  getLidoVotingPower,
  getLidoDelegates,
  getLidoDelegatePayload,
  getAaveVotingPower,
  getAaveDelegates,
  getAaveDelegatePayload,
};
