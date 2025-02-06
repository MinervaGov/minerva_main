"use client";

import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function CreateAgentButton() {
  const user = useSelector((state) => state.user.user);

  const router = useRouter();

  return (
    user && (
      <Button
        onPress={() => {
          router.push("/create-agent");
        }}
      >
        <Plus className="w-4 h-4" />
        Create Agent
      </Button>
    )
  );
}
