"use client";

import useSelectAgent from "@/hooks/useSelectAgent";
import { useEffect } from "react";

export default function AgentProvider({ children }) {
  const { loadAgent } = useSelectAgent();

  useEffect(() => {
    loadAgent();
  }, []);

  return <div>{children}</div>;
}
