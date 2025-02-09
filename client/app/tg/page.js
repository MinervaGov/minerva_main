"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

export default function Tg() {
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

          <Image
            src="/landing/telegram.svg"
            alt="Telegram"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>

        <p className="text-white text-2xl font-bold text-center">
          Get Notification <br /> Via Telegram
        </p>

        <div className="text-white flex flex-col gap-3 text-sm">
          <p>1. Login to your Telegram account</p>

          <p>
            2. Open the Minerva Bot using this link{" "}
            <span
              className="underline text-blue-600"
              onClick={() => {
                window.open("https://t.me/Mnvgov_bot", "_blank");
              }}
            >
              https://t.me/Mnvgov_bot
            </span>
          </p>

          <p>
            3. Use the subscribe command to get notified when new DAOs are
            created. <br />
            <span className="under text-blue-600">
              /subscribe {`<agent name>`}
            </span>
          </p>
        </div>

        <Button
          className="w-full mt-5"
          onPress={() => {
            window.open("https://t.me/Mnvgov_bot", "_blank");
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
