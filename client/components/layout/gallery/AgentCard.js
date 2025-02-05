"use client";

import React from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";

import BotAvatar from "./BotAvatar";

const AgentCard = () => {
  return (
    <Card
      isFooterBlurred
      className="pt-4 w-fit border border-transparent hover:border-white/40 transition-colors"
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">By: Anoy B3t1</p>
        <small className="text-default-500">Bot Id: 3k132</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>

      <CardBody className="overflow-hidden py-2">
        <BotAvatar />
      </CardBody>

      <CardFooter className="justify-between bg-black/60 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">Arbitrum, Lido</p>

        <Button
          className="text-tiny text-white bg-black/20"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
        >
          Open
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
