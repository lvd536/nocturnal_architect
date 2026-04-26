import { ChevronDown, Shield, Trash2, UserCog } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRoleStore } from "@/store/roleStore";
import { BoardMember } from "@/types/board.types";

interface TeamMemberProps {
    member: BoardMember;
    onKick: (memberId: string) => void;
    onUpdateRole: (
        memberId: string,
        role: "owner" | "editor" | "viewer",
    ) => void;
    isCurrentUser: boolean
}

export function TeamMember({ member, onKick, onUpdateRole, isCurrentUser }: TeamMemberProps) {
    const isOwner = useRoleStore((s) => s.isOwner);

    return (
        <li className="relative flex flex-col gap-5 overflow-hidden border backdrop-blur-xl bg-[#1a191b]/60 p-5 rounded-2xl border-white/5 transition-all duration-300 hover:bg-[#1a191b]/80 hover:border-white/10 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#d0bcff] opacity-5 blur-[60px] pointer-events-none" />

            <div className="relative flex items-center gap-4">
                <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-xl bg-linear-to-br from-[#d0bcff]/20 to-transparent border border-[#d0bcff]/15 text-[#d0bcff] font-bold text-sm tracking-tighter shadow-[inset_0_1px_4px_rgba(208,188,255,0.2)]">
                    {member.profiles.display_name.slice(0, 2).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-base text-[#e5e2e3] truncate tracking-tight">
                        {member.profiles.display_name}
                    </h3>
                    <p className="font-medium text-xs text-zinc-500 mt-0.5 truncate">
                        {member.profiles.company_name || "No company"}
                    </p>
                </div>
            </div>

            <div className="relative">
                <p className="font-normal text-sm leading-relaxed text-zinc-400 line-clamp-2 min-h-10">
                    {member.profiles.bio || "No bio description provided yet."}
                </p>
            </div>

            <div className="relative flex items-center justify-between pt-4 gap-3 mt-auto border-t border-white/5">
                {isOwner && !isCurrentUser ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="group flex items-center gap-1.5 bg-[#d0bcff]/10 hover:bg-[#d0bcff]/20 transition-all font-bold text-[10px] tracking-widest uppercase text-[#d0bcff] pl-2.5 pr-2 py-1.5 rounded-lg border border-[#d0bcff]/10 hover:border-[#d0bcff]/30 focus:outline-none focus:ring-2 focus:ring-[#d0bcff]/30">
                            {member.role}
                            <ChevronDown
                                size={14}
                                strokeWidth={2.5}
                                className="opacity-50 group-hover:opacity-100 transition-opacity"
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="start"
                            className="w-48 bg-[#1a191b] border-white/10 text-white shadow-xl rounded-xl p-1"
                        >
                            <DropdownMenuLabel className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold px-2 py-1.5">
                                Access Level
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator className="bg-white/5 mx-1" />

                            <DropdownMenuItem
                                className="cursor-pointer rounded-md hover:bg-white/5 focus:bg-white/5 text-sm font-medium px-2.5 py-1.5 mb-1"
                                onClick={() =>
                                    onUpdateRole(member.id, "editor")
                                }
                            >
                                <UserCog className="mr-2 h-4 w-4 text-[#d0bcff]/80" />{" "}
                                Editor
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer rounded-md hover:bg-white/5 focus:bg-white/5 text-sm font-medium px-2.5 py-1.5"
                                onClick={() =>
                                    onUpdateRole(member.id, "viewer")
                                }
                            >
                                <Shield className="mr-2 h-4 w-4 text-[#d0bcff]/80" />{" "}
                                Viewer
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="bg-white/5 mx-1 my-1" />

                            <DropdownMenuItem
                                className="cursor-pointer rounded-md text-red-400 hover:bg-red-500/15 focus:text-red-400 focus:bg-red-500/15 text-sm font-medium px-2.5 py-1.5"
                                onClick={() => onKick(member.id)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Remove
                                Access
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <span className="bg-[#d0bcff]/5 font-bold text-[10px] tracking-widest uppercase text-[#d0bcff]/70 px-2.5 py-1.5 rounded-lg border border-white/5">
                        {member.role}
                    </span>
                )}

                <span className="text-[11px] font-medium text-zinc-600">
                    Joined {new Date(member.created_at).toLocaleDateString()}
                </span>
            </div>
        </li>
    );
}
