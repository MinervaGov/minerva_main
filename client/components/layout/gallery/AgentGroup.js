"use client";

import { ChevronDown, Twitter, Tag } from "lucide-react";
import BotAvatar from "./BotAvatar";
import { useRouter } from "next/navigation";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    public: "bg-green-800 text-green-300 border-green-700",
    private: "bg-purple-800 text-purple-300 border-purple-700",
  };

  return (
    <span
      className={`px-2 py-0.5 text-sm font-medium rounded-full border ${statusStyles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ProfileTypeBadge = ({ profileType }) => {
  const profileTypeStyles = {
    twitter: "bg-blue-800 text-blue-300 border-blue-700",
    tags: "bg-purple-800 text-purple-300 border-purple-700",
  };

  return (
    <div
      className={`px-2 py-0.5 text-sm flex items-center gap-2 font-medium rounded-full border ${profileTypeStyles[profileType]}`}
    >
      {profileType === "twitter" && <Twitter className="w-4 h-4" />}
      {profileType === "tags" && <Tag className="w-4 h-4" />}
      {profileType.charAt(0).toUpperCase() + profileType.slice(1)}
    </div>
  );
};

const AgentGroup = ({ title, agents }) => {
  const router = useRouter();

  return (
    <div className="border-b border-zinc-700 last:border-b-0">
      <div className="flex items-center px-4 py-3 bg-zinc-850 border-b border-zinc-700">
        <ChevronDown className="h-4 w-4 text-zinc-400 mr-2" />
        <h2 className="text-sm font-semibold text-white">
          {title} ({agents.length})
        </h2>
      </div>
      <div className="divide-y divide-zinc-700">
        {agents.map((agent) => (
          <div
            key={agent._id}
            className="flex items-center px-4 py-3 hover:bg-zinc-750 cursor-pointer group"
            onClick={() => {
              router.push(`/agents/${agent.name}`);
            }}
          >
            <BotAvatar className="mr-3" name={agent.name} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 truncate pr-4">
                  {agent.name}
                  <span className="text-sm text-zinc-400">
                    {".minervagov.eth"}
                  </span>
                </h3>
                <div className="flex items-center gap-2 ml-4">
                  <StatusBadge status={agent.visibility} />
                </div>
              </div>
              <div className="mt-1 flex items-center gap-4 text-sm text-zinc-500">
                <span>
                  Created {new Date(agent._creationTime).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  <p>Profile Type:</p>
                  <ProfileTypeBadge profileType={agent.profileType} />
                </div>

                <div className="flex items-center gap-2">
                  <p>Relates to:</p>
                  {agent.profileType === "twitter" && (
                    <div className="flex items-center gap-2">
                      <Twitter className="w-4 h-4" />
                      <span>@{agent.twitterProfile.twitterId}</span>
                    </div>
                  )}
                  {agent.profileType === "tags" && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span>{agent.tags.join(", ")}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentGroup;
