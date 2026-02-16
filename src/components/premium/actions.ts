"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";

import { env } from "@/env";
import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(priceId: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Não autorizado");
  }

  let stripeCustomerId = user.privateMetadata.stripeCustomerId as
    | string
    | undefined;

  // Create a Stripe customer if one doesn't exist
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.emailAddresses[0].emailAddress,
      metadata: {
        userId: user.id,
      },
    });

    stripeCustomerId = customer.id;

    // Save the customer ID to Clerk
    await (
      await clerkClient()
    ).users.updateUserMetadata(user.id, {
      privateMetadata: {
        stripeCustomerId: customer.id,
      },
    });
  } else {
    // Ensure existing customer has correct metadata
    const customer = await stripe.customers.retrieve(stripeCustomerId);
    if (
      !customer.deleted &&
      (!customer.metadata?.userId || customer.metadata.userId !== user.id)
    ) {
      await stripe.customers.update(stripeCustomerId, {
        metadata: {
          userId: user.id,
        },
      });
    }
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${env.NEXT_PUBLIC_BASE_URL}/billing/success`,
    cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`,
    customer: stripeCustomerId,
    metadata: {
      userId: user.id,
    },
    subscription_data: {
      metadata: {
        userId: user.id,
      },
    },
    custom_text: {
      terms_of_service_acceptance: {
        message: `Li e concordo com os [termos de serviço](${env.NEXT_PUBLIC_BASE_URL}/tos) do AI Resume Builder.`,
      },
    },
    consent_collection: {
      terms_of_service: "required",
    },
  });

  if (!session.url) {
    throw new Error("Falha ao criar sessão de checkout");
  }

  return session.url;
}
