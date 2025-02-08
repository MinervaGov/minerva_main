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
import { Loader2, X } from "lucide-react";
import { RadioGroup, Radio } from "@heroui/react";
import { useState } from "react";
import { toast } from "sonner";

export default function DisputeButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isDisputing = useSelector((state) => state.agent.isDisputing);
  const selectedDecision = useSelector((state) => state.agent.selectedDecision);
  const { disputeDecision } = useSelectAgent();
  const [finalDecision, setFinalDecision] = useState("");

  return (
    <>
      <Button
        size="sm"
        className="w-fit bg-red-500"
        onPress={() => {
          onOpen();
        }}
      >
        <X className="w-4 h-4" /> Dispute
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={!isDisputing}
        isKeyboardDismissDisabled={isDisputing}
        hideCloseButton={isDisputing}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-3">Dispute Decision</ModalHeader>
              <ModalBody className="-mt-3">
                <p>
                  Are you sure you want to dispute the decision? This will
                  dispute the decision and update the decision.
                </p>

                <RadioGroup
                  label="Select the final decision"
                  value={finalDecision}
                  onValueChange={setFinalDecision}
                >
                  {selectedDecision.proposal.choices.map((choice) => (
                    <Radio
                      key={choice}
                      value={choice}
                      isDisabled={
                        selectedDecision.proposal.choices[
                          Number(selectedDecision.primaryDecision) - 1
                        ] === choice
                      }
                    >
                      {choice}{" "}
                      {selectedDecision.proposal.choices[
                        Number(selectedDecision.primaryDecision) - 1
                      ] === choice && (
                        <span className="ml-2 text-xs text-zinc-400">
                          (Primary Decision)
                        </span>
                      )}
                    </Radio>
                  ))}
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    if (isDisputing) {
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
                    if (isDisputing) {
                      return;
                    }

                    if (finalDecision === "") {
                      toast.error("Please select a final decision");
                      return;
                    }

                    const index = selectedDecision.proposal.choices.indexOf(
                      finalDecision
                    );

                    disputeDecision(
                      selectedDecision._id,
                      (index + 1).toString(),
                      onClose
                    );
                  }}
                >
                  {isDisputing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Dispute"
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
