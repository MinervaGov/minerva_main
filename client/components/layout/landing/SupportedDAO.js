import Image from "next/image";

export default function SupportedDAO() {
  return (
    <div className="bg-black w-full flex py-10 pt-20 gap-10 flex-col items-center justify-center 2xl:px-52 xl:px-20 px-5 sm:px-10">
      <h2 className="text-2xl font-medium text-white">Supported DAOs</h2>

      <div className="flex items-center flex-col sm:flex-row gap-10 w-full">
        <div className="flex-1 lg:flex items-center  min-w-40 min-h-12 relative prevent-select hidden">
          <Image
            src="/landing/lido-dao.svg"
            alt="lido dao Logo"
            fill
            className="invert"
            style={{
              objectFit: "contain",
              objectPosition: "start",
            }}
          />
        </div>
        <div className="flex-1 flex items-center min-w-40 min-h-20 relative prevent-select">
          <Image
            src="/landing/arbitrumdao.png"
            alt="arbitrum dao Logo"
            fill
            style={{
              objectFit: "contain",
              objectPosition: "start",
            }}
            className="mt-1 sm:scale-75 scale-120"
          />
        </div>

        <div className="flex-1 flex items-center  min-w-40 min-h-8 mt-1 relative prevent-select">
          <Image
            src="/landing/aave.svg"
            alt="Aave DAO Logo"
            fill
            className="invert"
            style={{
              objectFit: "contain",
              objectPosition: "start",
            }}
          />
        </div>
      </div>
      <div className="flex items-center flex-col sm:flex-row gap-10 w-full">
        <div className="flex-1 lg:hidden items-center  min-w-40 min-h-12 relative prevent-select flex">
          <Image
            src="/landing/aave.svg"
            alt="Aave DAO Logo"
            fill
            className="invert"
            style={{
              objectFit: "contain",
              objectPosition: "start",
            }}
          />
        </div>
      </div>
    </div>
  );
}
