"use client";

import Link from "next/link";
import { ChevronUp } from "lucide-react";
import { useCatContext } from "@/context/CatContext";

export function BottomBarNavigation(): React.ReactElement {
  const { matchesPlayed } = useCatContext();

  return (
    <nav className="flex justify-center">
      <div className="fixed -bottom-0.5 z-50 rounded-t-lg border border-blue-950 bg-white md:w-1/2 md:max-w-md">
        <Link href="/" className="h-full w-full">
          <div className="flex flex-col items-center justify-center space-y-0.5 px-4 py-1 md:space-y-2">
            <ChevronUp size={22} strokeWidth={2.2} color="black" />
            <h2 className="text-sm font-semibold text-blue-900 md:text-lg lg:text-xl">
              Voir le classement des chats
            </h2>
            <p className="text-sm text-blue-800 md:text-base lg:text-lg">
              <span className="font-bold">{matchesPlayed}</span> Matchs joués
            </p>
          </div>
        </Link>
      </div>
    </nav>
  );
}
