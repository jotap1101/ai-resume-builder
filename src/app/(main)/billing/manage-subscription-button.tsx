"use client";

import { useState } from "react";
import { toast } from "sonner";

import { createCustomerPortalSession } from "@/app/(main)/billing/actions";
import { LoadingButton } from "@/components/loading-button";

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);

      const redirectUrl = await createCustomerPortalSession();

      window.location.href = redirectUrl;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error(error);

      toast.error(
        "Falha ao redirecionar para o portal do cliente. Por favor, tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton onClick={handleClick} loading={loading}>
      Gerenciar assinatura
    </LoadingButton>
  );
}
