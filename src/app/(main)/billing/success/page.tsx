import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Faturamento Concluído",
  description:
    "O checkout foi bem-sucedido e sua conta Pro foi ativada. Aproveite!",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl space-y-6 px-3 py-6 text-center">
      <h1 className="text-3xl font-bold">Faturamento Concluído</h1>
      <p>O checkout foi bem-sucedido e sua conta Pro foi ativada. Aproveite!</p>
      <Button asChild>
        <Link href="/resumes">Ir para a área de currículos</Link>
      </Button>
    </main>
  );
}
