"use client";

import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function CreateAgentButton() {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  return (
    user && (
      <Button
        onPress={async () => {
          router.push("/create-agent");

          // const hub = "https://testnet.hub.snapshot.org"; // or https://testnet.hub.snapshot.org for testnet
          // const client = new snapshot.Client712(hub);

          // const receipt = await client.vote(signer, address, {
          //   space: "minervagov.eth",
          //   proposal:
          //     "0x75c7fcaee41305bdba2350bcb0a0d14b90cf98fa0729ad4b48098b53360b1223",
          //   type: "single-choice",
          //   choice: 2,
          //   reason: "Choice 2 make lot of sense",
          //   app: "my-app",
          // });

          // console.log(receipt);
          // return;

          // console.log(address);

          // const domain = {
          //   name: "snapshot",
          //   version: "0.1.4",
          // };

          // // Types definition
          // const types = {
          //   Vote: [
          //     { name: "from", type: "address" },
          //     { name: "space", type: "string" },
          //     { name: "timestamp", type: "uint64" },
          //     { name: "proposal", type: "bytes32" },
          //     { name: "choice", type: "uint32" },
          //     { name: "reason", type: "string" },
          //     { name: "app", type: "string" },
          //     { name: "metadata", type: "string" },
          //   ],
          // };

          // // Message data
          // const message = {
          //   from: address,
          //   space: "minervagov.eth",
          //   timestamp: Number((new Date().getTime() / 1000).toFixed(0)),
          //   proposal:
          //     "0x75c7fcaee41305bdba2350bcb0a0d14b90cf98fa0729ad4b48098b53360b1223",
          //   choice: Number("1"),
          //   reason: "Choice 1 make lot of sense",
          //   app: "minervagov",
          //   metadata: "{}",
          // };

          // const signature = await signer._signTypedData(domain, types, message);

          // console.log({
          //   address: address,
          //   data: {
          //     domain,
          //     types,
          //     message,
          //   },
          //   sig: signature,
          // });

          // const response = await axios.post(
          //   "https://testnet.seq.snapshot.org/",
          //   {
          //     address,
          //     sig: signature,
          //     data: {
          //       domain,
          //       types,
          //       message,
          //     },
          //   }
          // );

          // console.log(response.data);
        }}
      >
        <Plus className="w-4 h-4" />
        Create Agent
      </Button>
    )
  );
}
