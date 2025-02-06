"use client";

import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import useAgent from "@/hooks/useAgent";
export default function GalleryProvider({ children }) {
  const user = useSelector((state) => state.user.user);
  const { isConnected } = useAccount();
  const { fetchUserAgents, fetchAllAgents } = useAgent();

  useEffect(() => {
    fetchAllAgents();
  }, [isConnected]);

  useEffect(() => {
    if (user) {
      fetchUserAgents(user._id);
    }
  }, [user]);

  return <>{children}</>;
}
