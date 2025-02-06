"use client";

import { Book, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDecision } from "@/redux/slice/agentSlice";

export default function Sidebar() {
  const selectedDecision = useSelector((state) => state.agent.selectedDecision);
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.agent.isLoading);
  const decisions = useSelector((state) => state.agent.decisions);

  return (
    <div className="rounded-md border border-zinc-600 overflow-hidden flex flex-col w-[400px]">
      <div className="px-4 py-4 border-b border-zinc-600 bg-zinc-800">
        <h2 className="text-md font-bold">Proposals</h2>
      </div>
      <div className="flex-1 relative">
        <div className="hide-scroll absolute h-full w-full overflow-y-auto">
          {!isLoading && !decisions && (
            <div className="flex items-center justify-center h-full">
              <div className="px-4 py-2 rounded-full bg-zinc-900">
                <p className="text-zinc-400">No proposals found</p>
              </div>
            </div>
          )}
          {isLoading && !decisions && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            </div>
          )}

          {decisions &&
            decisions.map((decision) => (
              <div
                key={decision.proposalId}
                onClick={() => {
                  dispatch(setSelectedDecision(decision));
                }}
                className={`p-4 cursor-pointer hover:bg-gray-750 border-b border-zinc-600 transition-colors
                        ${
                          selectedDecision?.proposalId === decision.proposalId
                            ? "bg-blue-900 bg-opacity-30"
                            : ""
                        }`}
              >
                <div className="flex items-start">
                  <Book className="h-5 w-5 text-green-400 mt-1 mr-3" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white hover:text-blue-400">
                        {decision.proposal.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                      {decision.proposal.aiSummary}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                      <div
                        className="rounded-full px-2 py-0.5 border capitalize"
                        style={{
                          borderColor:
                            decision.status === "pending"
                              ? "gray"
                              : decision.status === "decided"
                              ? "green"
                              : "red",
                          color:
                            decision.status === "pending"
                              ? "gray"
                              : decision.status === "decided"
                              ? "green"
                              : "red",
                        }}
                      >
                        {decision.status}
                      </div>
                      <p>
                        {new Date().getTime() > decision.proposal.endDate * 1000
                          ? "Ended"
                          : "Ends on"}{" "}
                        {new Date(
                          decision.proposal.endDate * 1000
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
