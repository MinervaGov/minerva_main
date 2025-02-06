"use client";

import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

export default function VisibilityBar() {
  const agent = useSelector((state) => state.agent.agent);
  const isLoading = useSelector((state) => state.agent.isLoading);

  return (
    <div
      className="bg-gray-100 w-full absolute h-1 flex justify-center top-0 transition-colors duration-300"
      style={{
        background: agent
          ? agent?.visibility === "public"
            ? "#2aad23"
            : "#5642d6"
          : "",
      }}
    >
      <div className="relative">
        <div
          className="absolute top-0 -left-12 w-24 h-6 bg-gray-100 rounded-b-md flex items-center justify-center transition-colors duration-300"
          style={{
            background: agent
              ? agent?.visibility === "public"
                ? "#2aad23"
                : "#5642d6"
              : "",
          }}
        >
          {!agent && isLoading && (
            <Loader2 className="animate-spin text-black/50 w-3 h-3" />
          )}
          {agent &&
            (agent?.visibility === "public" ? (
              <p className="text-white text-sm">Public</p>
            ) : (
              <p className="text-white text-sm">Private</p>
            ))}
        </div>
      </div>
    </div>
  );
}
