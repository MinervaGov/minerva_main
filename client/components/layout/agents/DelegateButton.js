"use client";

import { Copy, UserCheck, UserPlus } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useSelector } from "react-redux";
import daos from "@/utils/daoConfig";
import Image from "next/image";
import chains from "@/utils/chainConfig";
import { useAccount, useSwitchChain } from "wagmi";
import useSelectAgent from "@/hooks/useSelectAgent";
import { toast } from "sonner";

export default function DelegateButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const agent = useSelector((state) => state.agent.agent);
  const dao = agent ? daos.find((dao) => dao.id === agent.daoId) : null;
  const chain = chains.find((chain) => chain.id === dao?.chainId);
  const { chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { delegate } = useSelectAgent();
  const isDelegating = useSelector((state) => state.agent.isDelegating);
  const delegates = useSelector((state) => state.agent.delegates);
  const { isConnected } = useAccount();
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <div
        className="flex gap-2 items-center text-blue-300 cursor-pointer hover:text-blue-400"
        onClick={() => {
          if (!isConnected) {
            toast.error("Please connect your wallet");
            return;
          }

          if (!user) {
            toast.error("Please register to delegate");
            return;
          }

          if (delegates !== agent?.walletAddress) {
            onOpen();
          }
        }}
      >
        {delegates !== agent?.walletAddress && (
          <>
            <UserPlus className="w-5 h-5" />
            <p>Delegate</p>
          </>
        )}
        {delegates === agent?.walletAddress && (
          <>
            <UserCheck className="w-5 h-5" />
            <p>Delegated</p>
          </>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={!isDelegating}
        isKeyboardDismissDisabled={isDelegating}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-3">Delegate to </ModalHeader>
              <ModalBody className="-mt-6">
                <div
                  className="flex relative w-fit hover:cursor-pointer hover:text-blue-300 grayscale hover:grayscale-0"
                  onClick={() => {
                    if (agent) {
                      window.open(
                        `https://app.ens.domains/${agent.name}.minervagov.eth`,
                        "_blank"
                      );
                    }
                  }}
                >
                  {" "}
                  <p className="font-bold text-2xl">{agent?.name}</p>
                  <p className="text-xs text-gray-400 absolute -bottom-3 right-0">
                    .minervagov.eth
                  </p>
                  <Image
                    src="/dao/ens-logo.png"
                    alt="logo"
                    width={20}
                    height={20}
                    className="rounded-full absolute -right-7 top-2"
                  />
                </div>

                <p className="text-sm mt-5">Delegatee Address</p>

                <div
                  className="flex items-center text-xs gap-2 px-3 -mt-1 p-1 w-fit bg-zinc-700 rounded-full cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(agent?.walletAddress);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <p>{agent?.walletAddress}</p>
                  <Copy className="w-3 h-3" />
                </div>

                <p className="text-sm mt-2">Target Chain</p>

                <div className="flex items-center text-xs gap-2 -mt-1 px-3 p-1 w-fit bg-zinc-700 rounded-full">
                  <Image
                    src={chain?.logo}
                    alt="logo"
                    width={18}
                    height={18}
                    className="rounded-full"
                  />
                  <p>{chain?.name}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    if (isDelegating) {
                      return;
                    }
                    onClose();
                  }}
                >
                  Close
                </Button>
                {chainId !== chain?.id && (
                  <Button
                    color="primary"
                    onPress={() => {
                      switchChain({ chainId: chain?.id });
                    }}
                  >
                    Switch Network
                  </Button>
                )}
                {chainId === chain?.id && (
                  <Button
                    color="primary"
                    onPress={() => {
                      delegate(agent?.walletAddress, dao?.id, onClose);
                    }}
                  >
                    {isDelegating ? "Delegating..." : "Delegate"}
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
