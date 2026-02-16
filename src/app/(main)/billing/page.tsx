import { auth } from "@clerk/nextjs/server";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import Stripe from "stripe";

import { GetSubscriptionButton } from "@/app/(main)/billing/get-subscription-button";
import { ManageSubscriptionButton } from "@/app/(main)/billing/manage-subscription-button";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Assinatura",
  description: "Gerencie sua assinatura do AI Resume Builder.",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">Assinatura</h1>
      <p>
        Seu plano atual:{" "}
        <span className="font-bold">
          {priceInfo ? (priceInfo.product as Stripe.Product).name : "Gratuito"}
        </span>
      </p>
      {subscription ? (
        <>
          {subscription.stripeCancelAtPeriodEnd && (
            <p className="text-destructive">
              Sua assinatura será cancelada em{" "}
              {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd, yyyy")}
            </p>
          )}
          <ManageSubscriptionButton />
        </>
      ) : (
        <GetSubscriptionButton />
      )}
    </main>
  );
}
