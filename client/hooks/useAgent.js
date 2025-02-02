"use client";

import axios from "axios";

export default function useAgent() {
  const checkTwitterProfile = async (username) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/agents/check-twitter-profile?twitterId=${username}`
    );

    return response.data.success;
  };

  const isValidAgentName = async (agentName) => {
    if (agentName.length < 3) {
      return false;
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/agents/get/${agentName}`
    );

    return response.data.success;
  };

  return { checkTwitterProfile, isValidAgentName };
}
