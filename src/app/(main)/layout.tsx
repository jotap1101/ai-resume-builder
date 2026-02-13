import { auth } from "@clerk/nextjs/server";

import { Navbar } from "@/app/(main)/navbar";
import { SubscriptionLevelProvider } from "@/app/(main)/subscription-level-provider";
import { PremiumModal } from "@/components/premium/premium-modal";
import { getUserSubscriptionLevel } from "@/lib/subscription";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const userSubscriptionLevel = await getUserSubscriptionLevel(userId);

  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
        <PremiumModal />
      </div>
    </SubscriptionLevelProvider>
  );
}
