"use client";

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Copy, UserPlus, Shield, Eye, Check } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { upsertInviteLink } from "@/actions/supabase/board";
import { useBoardStore } from "@/store/boardStore";

export function InviteModal({ children }: React.PropsWithChildren) {
    const [inviteCode, setInviteCode] = useState("");
    const [role, setRole] = useState<"editor" | "viewer">("editor");
    const [copied, setCopied] = useState(false);
    const boardId = useBoardStore((s) => s.boardId);

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

    const handleOpenChange = async (open: boolean) => {
        if (open) setInviteCode(nanoid(24));
        setCopied(false);
    };

    const inviteUrl = `${baseUrl}/app/invite/${inviteCode}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        if (!boardId) return;
        if (inviteCode && role)
            (async () => await upsertInviteLink(boardId, inviteCode, role))();
    }, [role, inviteCode, boardId]);

    return (
        <Dialog onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children ? (
                    children
                ) : (
                    <Button className="fixed w-11 h-11 shrink-0 bottom-10 right-10 bg-[#2dd4bf] hover:bg-[#2dd4bf]/90 text-black font-bold">
                        <UserPlus size={20} />
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-110 bg-[#1a191b] border-white/10 text-white shadow-2xl">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/5 rounded-lg">
                            <UserPlus className="text-zinc-400" size={20} />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold text-[#e5e2e3]">
                                Invite Member
                            </DialogTitle>
                            <p className="text-xs text-zinc-500">
                                Add new people to the workspace.
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-3 py-4">
                    <button
                        onClick={() => setRole("editor")}
                        className={`flex flex-col gap-2 p-4 rounded-xl border transition-all text-left ${
                            role === "editor"
                                ? "border-[#d0bcff] bg-[#d0bcff]/5"
                                : "border-white/5 bg-white/2"
                        }`}
                    >
                        <div className="flex justify-between items-start w-full">
                            <Shield
                                size={20}
                                className={
                                    role === "editor"
                                        ? "text-[#d0bcff]"
                                        : "text-zinc-500"
                                }
                            />
                            <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${role === "editor" ? "border-[#d0bcff]" : "border-zinc-700"}`}
                            >
                                {role === "editor" && (
                                    <div className="w-2 h-2 bg-[#d0bcff] rounded-full" />
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-sm">Editor</p>
                            <p className="text-[10px] text-zinc-500">
                                Full editing rights
                            </p>
                        </div>
                    </button>

                    <button
                        onClick={() => setRole("viewer")}
                        className={`flex flex-col gap-2 p-4 rounded-xl border transition-all text-left ${
                            role === "viewer"
                                ? "border-[#d0bcff] bg-[#d0bcff]/5"
                                : "border-white/5 bg-white/2"
                        }`}
                    >
                        <div className="flex justify-between items-start w-full">
                            <Eye
                                size={20}
                                className={
                                    role === "viewer"
                                        ? "text-[#d0bcff]"
                                        : "text-zinc-500"
                                }
                            />
                            <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${role === "viewer" ? "border-[#d0bcff]" : "border-zinc-700"}`}
                            >
                                {role === "viewer" && (
                                    <div className="w-2 h-2 bg-[#d0bcff] rounded-full" />
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-sm">Viewer</p>
                            <p className="text-[10px] text-zinc-500">
                                View & comment only
                            </p>
                        </div>
                    </button>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
                        Shareable invite link
                    </label>
                    <div className="relative group mt-1">
                        <Input
                            readOnly
                            value={inviteUrl}
                            className="bg-black/40 border-white/5 pr-20 text-xs h-11 focus-visible:ring-[#d0bcff]/30"
                        />
                        <Button
                            size="sm"
                            onClick={copyToClipboard}
                            className="absolute right-1 top-1 h-9 bg-transparent hover:bg-white/5 text-zinc-400 gap-2 border-none"
                        >
                            {copied ? (
                                <Check size={14} className="text-green-500" />
                            ) : (
                                <Copy size={14} />
                            )}
                            <span className="text-[10px] font-bold uppercase">
                                {copied ? "Copied" : "Copy"}
                            </span>
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="text-[10px] text-zinc-600 flex items-center gap-1.5">
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                        Link expires in 48 hours
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
