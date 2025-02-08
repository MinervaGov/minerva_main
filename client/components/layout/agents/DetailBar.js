"use client";

import { Book, Info } from "lucide-react";
import { useSelector } from "react-redux";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import MinervaText from "../onBoard/signin/MinervaText";
import ReEvaluateButton from "./ReEvaluateButton";
import DisputeButton from "./DisputeButton";

export default function DetailBar() {
  const selectedDecision = useSelector((state) => state.agent.selectedDecision);
  const agent = useSelector((state) => state.agent.agent);

  return (
    <div className="rounded-md border border-zinc-600 overflow-hidden flex flex-col w-full h-full">
      <div className="px-4 py-4 border-b border-zinc-600 bg-zinc-800">
        <h2 className="text-md font-bold">Details</h2>
      </div>

      {!selectedDecision && (
        <div className="flex-1 flex items-center justify-center">
          <div className="px-4 py-2 rounded-full bg-zinc-900">
            <p className="text-zinc-400">Select a proposal</p>
          </div>
        </div>
      )}

      {selectedDecision && (
        <div className="flex-1 relative">
          <div className="p-5 absolute w-full h-full overflow-y-auto">
            <div className="flex items-start">
              <Book className="h-5 w-5 text-green-400 mt-1 mr-3" />
              <div className="flex-1">
                <div className="flex flex-col gap-2 border-b border-zinc-600 pb-5 mb-5">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {selectedDecision.proposal.title}
                  </h2>

                  <div className="flex items-center gap-4 text-sm">
                    <div
                      className="rounded-full px-2 py-0.5 border w-fit capitalize"
                      style={{
                        borderColor:
                          selectedDecision.status === "pending"
                            ? "gray"
                            : selectedDecision.status === "decided"
                            ? "green"
                            : "red",
                        color:
                          selectedDecision.status === "pending"
                            ? "gray"
                            : selectedDecision.status === "decided"
                            ? "green"
                            : "red",
                      }}
                    >
                      {selectedDecision.status}
                    </div>

                    <p>
                      {new Date().getTime() >
                      selectedDecision.proposal.endDate * 1000
                        ? "Ended"
                        : "Ends on"}{" "}
                      {new Date(
                        selectedDecision.proposal.endDate * 1000
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  {selectedDecision.status === "decided" && (
                    <div className="flex flex-col gap-5 mt-2">
                      <div className="text-xs flex flex-wrap -mb-2 items-center gap-2 font-semibold text-zinc-400">
                        <p>Miverva suggested to vote for </p>
                        <div
                          className="text-sm text-white border border-zinc-600 rounded-full px-2 py-1"
                          style={{
                            borderColor: selectedDecision?.FinalDecision
                              ? "red"
                              : "",
                            color: selectedDecision?.FinalDecision ? "red" : "",
                          }}
                        >
                          {selectedDecision?.FinalDecision
                            ? selectedDecision.proposal.choices[
                                Number(selectedDecision.FinalDecision) - 1
                              ]
                            : selectedDecision.proposal.choices[
                                Number(selectedDecision.primaryDecision) - 1
                              ]}
                        </div>
                        <p>
                          Minerva{" "}
                          {new Date().getTime() >
                          selectedDecision.proposal.endDate * 1000 -
                            agent.delayPeriod
                            ? "has voted"
                            : "will vote"}{" "}
                          for this choice automatically on{" "}
                        </p>
                        <div className="text-sm text-white border border-zinc-600 rounded-full px-2 py-1">
                          {new Date(
                            selectedDecision.proposal.endDate * 1000 -
                              agent.delayPeriod
                          ).toLocaleDateString()}{" "}
                          {
                            new Date(
                              selectedDecision.proposal.endDate * 1000 -
                                agent.delayPeriod
                            )
                              .toTimeString()
                              .split(" ")[0]
                          }
                        </div>
                      </div>
                      <MinervaText
                        text={selectedDecision.primaryReason}
                        animate={false}
                      />

                      <div className="flex gap-2 items-center mt-1">
                        <Info className="w-5 h-5 text-zinc-400" />
                        <div className="text-xs text-zinc-400 border border-zinc-600 rounded-full px-2 py-1">
                          The Decision was made by an AI agent. This Decision is
                          not final and can be disputed. Or you can re-evaluate
                          the Decision.
                        </div>
                      </div>

                      {selectedDecision?.FinalDecision && (
                        <div className="flex gap-2 items-center mt-1">
                          <Info className="w-5 h-5 text-red-400" />
                          <div className="text-xs text-red-400 border border-red-600 rounded-full px-2 py-1">
                            The Decision was disputed.
                          </div>
                        </div>
                      )}

                      {!(
                        new Date().getTime() >
                        selectedDecision.proposal.endDate * 1000 -
                          agent.delayPeriod
                      ) &&
                        !selectedDecision?.FinalDecision && (
                          <div className="flex gap-2 items-center mt-1">
                            <ReEvaluateButton />

                            <DisputeButton />
                          </div>
                        )}
                    </div>
                  )}
                  {selectedDecision.status === "failed" && (
                    <div className="flex flex-col mt-2">
                      <div className="flex gap-2 mb-4 items-center">
                        <Info className="w-5 h-5 text-zinc-400" />
                        <div className="text-xs text-zinc-400 border border-zinc-600 rounded-full px-2 py-1">
                          The Decision failed to evaluate. Please re-evaluate
                          the Decision.
                        </div>
                      </div>
                      <ReEvaluateButton />
                    </div>
                  )}
                </div>

                <div className="mb-5">
                  <MinervaText
                    text={selectedDecision.proposal.aiSummary}
                    animate={false}
                  />
                </div>

                <div className="space-y-5">
                  <div className="bg-gray-850 p-5 rounded-xl border border-gray-700">
                    <div className="prose prose-invert max-w-none">
                      <MarkdownRenderer
                        content={selectedDecision.proposal.description}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
