import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar conta",
  description: "Crie uma conta para começar a usar o AI Resume Builder.",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <SignUp />
    </main>
  );
}
