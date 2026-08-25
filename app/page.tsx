import type { Metadata } from "next";
import AcademyApp from "./AcademyApp";
import { chatGPTSignInPath, chatGPTSignOutPath, getChatGPTUser } from "./chatgpt-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sol Academy — Memecoin Market Literacy",
  description: "An evidence-first, interactive curriculum for reading Solana memecoin markets, public trading VODs, wallet evidence, risk, and execution.",
};

export default async function Home() {
  const user = await getChatGPTUser();
  return (
    <AcademyApp
      cloudUser={user ? { userId: user.userId, displayName: user.displayName, email: user.email } : null}
      signInPath={chatGPTSignInPath("/")}
      signOutPath={chatGPTSignOutPath("/")}
    />
  );
}
