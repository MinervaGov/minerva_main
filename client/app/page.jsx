import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Minerva</h1>
      <p>DAO Agent</p>
      <Image src="/minerva.png" alt="Minerva" width={500} height={500} />
    </div>
  );
}
