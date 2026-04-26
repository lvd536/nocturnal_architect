"use client";

import { Loader2 } from "lucide-react";

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#1a191b]/80 backdrop-blur-md">
            <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 h-12 w-12 bg-[#d0bcff]/20 blur-xl rounded-full animate-pulse" />

                <Loader2
                    className="h-10 w-10 text-[#d0bcff] animate-spin shrink-0"
                    strokeWidth={1.5}
                />
            </div>

            <div className="mt-6 flex flex-col items-center gap-1">
                <h2 className="text-[#e5e2e3] font-bold text-lg tracking-tight">
                    Loading Workspace
                </h2>
                <p className="text-zinc-500 text-xs font-medium uppercase tracking-[0.2em] animate-pulse">
                    Please wait...
                </p>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20">
                <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" />
                </div>
            </div>
        </div>
    );
}
