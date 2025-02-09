"use client";

import Link from "next/link";
import Image from "next/image";

import LandingNavbar from "@/components/layout/landing/LandingNavbar";
import InfiniteScroll from "@/components/layout/landing/InfiniteScroll";
import StickyScrollSection from "@/components/layout/landing/StickyScrollSection";
import SupportedDAO from "@/components/layout/landing/SupportedDAO";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="overflow-hidden space-y-20 pt-8">
      <LandingNavbar />

      <div className="relative w-screen  px-4">
        <section>
          <div className="flex gap-8">
            <p className="capitalize text-2xl font-bold [writing-mode:vertical-rl] rotate-180 text-center">
              AI <span className="text-purple-500">Agent</span>
            </p>

            <div>
              <h1 className="font-bold text-6xl max-w-7xl mb-8">
                Automate Governance <br /> with{" "}
                <span className="text-purple-500">AI-Powered</span> <br /> DAO
                Voting
              </h1>

              <p className="text-zinc-300 text-lg max-w-md mb-8">
                Empower your governance with AI-driven decision-making. Create
                or delegate a bot to vote for you.
              </p>

              <Link
                href="/sign-in"
                className="block w-fit border border-gray-100 text-white py-3 px-6 text-sm hover:bg-white hover:text-black transition-[colors,transform] text-center active:scale-95 font-bold "
              >
                Launch App
              </Link>
            </div>
          </div>

          <div className="flex gap-8 mt-10 ml-16">
            <div className="space-y-2">
              <p className="text-2xl font-bold">Get Notification Via</p>

              <div className="flex items-center gap-2">
                <div
                  className="rounded-full  w-12 h-12 flex justify-center items-center cursor-pointer"
                  onClick={() => router.push("/tg")}
                >
                  <Image
                    src="/landing/telegram.svg"
                    alt="Telegram"
                    width={48}
                    height={48}
                  />
                </div>

                <div
                  className="rounded-full bg-white w-12 h-12 flex justify-center items-center cursor-pointer"
                  onClick={() => router.push("/discord")}
                >
                  <Image
                    src="/landing/discord.svg"
                    alt="Discord"
                    width={36}
                    height={36}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-36">
          <InfiniteScroll text="MAKE YOUR VOICES HEARD" />
        </section>

        <section className="mt-32">
          <StickyScrollSection />
        </section>

        <section className="-mt-52">
          <InfiniteScroll text="GOVERNANCE MADE EASY" />
        </section>

        <SupportedDAO />

        <div className="w-full pb-20">
          <div className="flex flex-col items-center text-center justify-center h-[500px] max-w-[900px] mx-auto">
            <div className="text-white text-5xl">
              Built for thousands of delegators to make their voices heard
            </div>

            <div className="text-white text-xl mt-10">at</div>

            <div className="text-white text-3xl mt-1 font-semibold">
              ETH Global Agentic <p className="text-6xl font-bold">HACKATHON</p>{" "}
              <p className="">2025</p>
            </div>
          </div>
        </div>

        <Image
          src="/minerva/avatar.jpeg"
          alt="Hero"
          width={500}
          height={500}
          className="absolute right-16 top-0 rounded-full"
        />
      </div>
    </main>
  );
}
