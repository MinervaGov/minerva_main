"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

export default function Discord() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-zinc-900 w-[400px] rounded-2xl flex flex-col items-center gap-5 text-center px-8 pb-8">
        <div className="flex items-center gap-2 justify-center mt-10">
          <Image
            src="/minerva/avatar.jpeg"
            alt="Minerva"
            width={75}
            height={75}
            className="rounded-full"
          />

          <Ellipsis className="text-white animate-pulse" size={50} />

          <div className="rounded-full bg-white w-[80px] h-[80px] flex justify-center items-center">
            <Image
              src="/landing/discord.svg"
              alt="Discord"
              width={70}
              height={70}
              className="rounded-full"
            />
          </div>
        </div>

        <p className="text-white text-2xl font-bold text-center">
          Get Notification <br /> Via Discord
        </p>

        <div className="text-white flex flex-col gap-3 text-sm">
          <p>1. You can chat with Minerva on Discord</p>

          <p>
            2. DM Minerva on Discord{" "}
            <span
              className="underline text-blue-600"
              onClick={() => {
                window.open(
                  " https://discord.com/users/1337796893052244133",
                  "_blank"
                );
              }}
            >
              Link
            </span>
          </p>

          <p>
            3. Or, invite Minerva to your server <br />
            <span
              className="underline text-blue-600"
              onClick={() => {
                window.open(
                  "https://discord.com/oauth2/authorize?client_id=1337796893052244133",
                  "_blank"
                );
              }}
            >
              Link
            </span>
          </p>

          <p>
            4. Subscribe to Minerva on Discord <br />
            <span className="underline text-blue-600">
              /subscribe {`<agent name>`}
            </span>
          </p>
        </div>

        <Button
          className="w-full mt-5"
          onPress={() => {
            window.open(
              "https://discord.com/users/1337796893052244133",
              "_blank"
            );
          }}
        >
          Chat with Minerva
        </Button>
        <Button
          className="w-full"
          onPress={() => {
            router.push("/sign-in");
          }}
        >
          Create your own agent
        </Button>
      </div>
    </div>
  );
}
