import type { Metadata } from "next";
import AcademyApp from "./AcademyApp";

export const metadata: Metadata = {
  title: "Sol Academy — Memecoin Market Literacy",
  description: "An evidence-first, interactive curriculum for reading Solana memecoin markets, public trading VODs, wallet evidence, risk, and execution.",
};

export default function Home() {
  return <AcademyApp />;
}
