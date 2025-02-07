"use client";

import useUser from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

export default function UserProvider({ children }) {
  const { fetchUserProfile, getFollowedAgents } = useUser();
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!pathname) return;
    if (user) return;
    if (!isConnected) return;

    if (pathname === "/" || pathname === "/sign-in") return;

    fetchUserProfile();
  }, [isConnected, pathname]);

  useEffect(() => {
    if (!user) return;
    getFollowedAgents();
  }, [user]);

  return <>{children}</>;
}
