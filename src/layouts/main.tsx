import React from "react";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useScrollDirection";

interface MainLayoutProps {
  header: React.ReactNode;
  main: React.ReactNode;
}

export function MainLayout({ header, main }: MainLayoutProps) {
  const scrollDirection = useScrollDirection();

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b h-20 md:h-16",
          "md:sticky md:top-0",
          "bg-background/80 backdrop-blur-md border-border",
          "w-full px-4",
          scrollDirection === "down"
            ? "-translate-y-full md:translate-y-0"
            : "translate-y-0",
        )}
      >
        {header}
      </header>
      <main className="w-full px-4 pt-16 md:pt-0">{main}</main>
    </div>
  );
}
