"use client";

import { Book } from "lucide-react";
import { useSelector } from "react-redux";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import MinervaText from "../onBoard/signin/MinervaText";

export default function DetailBar() {
  const selectedDecision = useSelector((state) => state.agent.selectedDecision);

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
                </div>

                <div className="mb-5">
                  <MinervaText text={selectedDecision.proposal.aiSummary} />
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
