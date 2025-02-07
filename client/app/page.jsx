import Link from "next/link";
import Image from "next/image";

import LandingNavbar from "@/components/layout/landing/LandingNavbar";
import InfiniteScroll from "@/components/layout/landing/InfiniteScroll";

export default function Home() {
  return (
    <main className="overflow-hidden space-y-20 pt-8">
      <LandingNavbar />

      <div className="relative w-screen overflow-hidden px-4">
        <section>
          <div className="flex gap-8">
            <p className="capitalize text-2xl font-bold [writing-mode:vertical-rl] rotate-180 text-center">
              AI <span className="text-purple-500">Agent</span>
            </p>

            <div>
              <h1 className="font-bold text-8xl max-w-7xl mb-8">
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

          <div className="flex gap-8 mt-10">
            <p className="capitalize text-2xl font-bold [writing-mode:vertical-rl] rotate-180 text-center visible md:invisible">
              HI
            </p>

            <div className="space-y-2">
              <p className="text-2xl font-bold">Get Notification Via</p>

              <div className="flex items-center gap-2">
                <Image
                  src="/landing/telegram.svg"
                  alt="Telegram"
                  width={48}
                  height={48}
                />

                <div className="rounded-full bg-white w-12 h-12 flex justify-center items-center">
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

        <section>
          <InfiniteScroll />
        </section>

        <Image
          src="/landing/robot.png"
          alt="Hero"
          width={640}
          height={1121}
          className="absolute right-0 top-32 -rotate-12"
        />
      </div>
    </main>
  );
}
