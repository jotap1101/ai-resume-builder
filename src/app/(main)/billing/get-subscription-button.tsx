"use client";

import { Button } from "@/components/ui/button";
import { usePremiumModal } from "@/hooks/use-premium-modal";

export function GetSubscriptionButton() {
  const premiumModal = usePremiumModal();

  return (
    <Button onClick={() => premiumModal.setOpen(true)} variant="default">
      Obter assinatura Premium
    </Button>
  );
}
