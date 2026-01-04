import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function ResumeEditor() {
  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design your resume</h1>
        <p className="text-muted-foreground text-sm">
          Follow the steps below to create your resume. Your progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute inset-0 flex w-full flex-col md:flex-row">
          {/* Left */}
          <div className="w-full p-4 md:w-1/2">left</div>

          {/* Separator Mobile (Horizontal) */}
          <Separator orientation="horizontal" className="block md:hidden" />

          {/* Separator Desktop (Vertical) */}
          <Separator orientation="vertical" className="hidden md:block" />

          {/* Right */}
          <div className="w-full p-4 md:w-1/2">right</div>
        </div>
      </main>
      <footer className="w-full border-t px-3 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="secondary">Previous step</Button>
            <Button>Next step</Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" asChild>
              <Link href="/resumes">Close</Link>
            </Button>
            <p className="text-muted-foreground opacity-0">Saving...</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
