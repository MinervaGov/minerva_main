import { createRequire } from "module";
const require = createRequire(import.meta.url);

const ArbTokenABI = require("../lib/contracts/ArbToken.json");
const LidoDAOTokenABI = require("../lib/contracts/LidoDAOToken.json");
const DelegateRegistryABI = require("../lib/contracts/DelegateRegistry.json");
const AaveTokenABI = require("../lib/contracts/AaveToken.json");

const daos = [
  {
    id: "arbitrum",
    snapshotSpace: "arbitrumfoundation.eth",
    chainId: 42161,
    deployments: {
      arbToken: {
        address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
        abi: ArbTokenABI,
      },
    },
  },
  {
    id: "lido",
    snapshotSpace: "lido-snapshot.eth",
    chainId: 1,
    deployments: {
      lidoDAOToken: {
        address: "0x5a98fcbea516cf06857215779fd812ca3bef1b32",
        abi: LidoDAOTokenABI,
      },
      delegateRegistry: {
        address: "0x469788fE6E9E9681C6ebF3bF78e7Fd26Fc015446",
        abi: DelegateRegistryABI,
      },
    },
  },
  {
    id: "aave",
    snapshotSpace: "aave.eth",
    chainId: 1,
    deployments: {
      aaveToken: {
        address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
        abi: AaveTokenABI,
      },
    },
  },
];

export default daos;
