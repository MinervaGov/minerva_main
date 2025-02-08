"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import useSelectAgent from "@/hooks/useSelectAgent";
import { useSelector } from "react-redux";
import { Loader2, RefreshCcw } from "lucide-react";

export default function ReEvaluateButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isEvaluating = useSelector((state) => state.agent.isEvaluating);
  const selectedDecision = useSelector((state) => state.agent.selectedDecision);
  const { reEvaluateDecision } = useSelectAgent();

  return (
    <>
      <Button
        size="sm"
        className="w-fit"
        onPress={() => {
          onOpen();
        }}
      >
        <RefreshCcw className="w-4 h-4" /> Re-evaluate
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={!isEvaluating}
        isKeyboardDismissDisabled={isEvaluating}
        hideCloseButton={isEvaluating}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-3">
                Re-evaluate Proposal
              </ModalHeader>
              <ModalBody className="-mt-3">
                <p>
                  Are you sure you want to re-evaluate the proposal? This will
                  re-evaluate the proposal and update the decision.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    if (isEvaluating) {
                      return;
                    }
                    onClose();
                  }}
                >
                  Close
                </Button>

                <Button
                  color="primary"
                  onPress={() => {
                    if (isEvaluating) {
                      return;
                    }
                    reEvaluateDecision(selectedDecision._id, onClose);
                  }}
                >
                  {isEvaluating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Re-evaluate"
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
