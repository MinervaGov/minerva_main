import { createRequire } from "module";
const require = createRequire(import.meta.url);

const ArbTokenABI = require("../lib/contracts/ArbToken.json");

const daos = [
  {
    id: "arbitrum",
    snapshotSpace: "minervagov.eth",
    chainId: 42161,
    deployments: {
      arbToken: {
        address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
        abi: ArbTokenABI,
      },
    },
  },
  // {
  //   id: "lido",
  //   snapshotSpace: "lido",
  // },
  // {
  //   id: "aave",
  //   snapshotSpace: "aave",
  // },
];

export default daos;
