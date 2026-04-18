"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useBoardMembers } from "@/hooks/useBoardMembers";

export default function TeamMembersList() {
    const { members, loading, error } = useBoardMembers();

    if (loading)
        return (
            <div className="flex w-full gap-4 items-stretch flex-wrap">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="w-70 h-52.5 flex flex-col gap-4 border border-white/5 bg-[#1a191b]/40 p-5 rounded-2xl"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-3/4 bg-white/5" />
                                <Skeleton className="h-3 w-1/2 bg-white/5" />
                            </div>
                            <Skeleton className="h-12 w-12 rounded-xl bg-white/5 shrink-0" />
                        </div>

                        <div className="space-y-2 mt-2">
                            <Skeleton className="h-3 w-full bg-white/5" />
                            <Skeleton className="h-3 w-4/5 bg-white/5" />
                        </div>

                        <div className="mt-auto pt-2 flex items-center justify-between border-t border-white/3">
                            <Skeleton className="h-6 w-16 rounded-lg bg-white/5" />
                            <Skeleton className="h-3 w-12 bg-white/5" />
                        </div>
                    </div>
                ))}
            </div>
        );

    if (error)
        return (
            <div className="w-full text-center text-foreground/80 text-xl">
                {error}
            </div>
        );

    return (
        <ul className="flex gap-4 items-stretch flex-wrap">
            {members && members.length > 0 ? (
                members.map((member) => (
                    <li
                        className="relative overflow-hidden flex flex-col gap-4 border backdrop-blur-xl bg-[#1a191b]/60 p-5 rounded-2xl border-white/5 transition-all hover:border-white/10"
                        key={member.id}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(208,188,255,0.08)_0%,transparent_70%)] pointer-events-none" />

                        <div className="relative flex items-center justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <h3 className="font-bold text-lg text-[#e5e2e3] truncate">
                                    {member.profiles.display_name}
                                </h3>
                                <p className="font-medium text-xs text-zinc-400 mt-0.5">
                                    {member.profiles.company_name ||
                                        "No company"}
                                </p>
                            </div>

                            <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-xl bg-linear-to-br from-[#d0bcff]/20 to-[#d0bcff]/5 border border-[#d0bcff]/10 text-[#d0bcff] font-bold text-sm tracking-tighter shadow-inner">
                                {member.profiles.display_name
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </div>
                        </div>

                        <p className="relative font-normal text-sm leading-relaxed text-zinc-500 line-clamp-2 min-h-10">
                            {member.profiles.bio ||
                                "No bio description provided yet."}
                        </p>

                        <div className="relative pt-2 mt-auto flex items-center justify-between border-t border-white/3">
                            <span className="bg-[#d0bcff]/10 font-bold text-[10px] tracking-widest uppercase text-[#d0bcff] px-2.5 py-1 rounded-lg border border-[#d0bcff]/5">
                                {member.role}
                            </span>

                            <span className="text-[10px] text-zinc-600">
                                {new Date(
                                    member.created_at,
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    </li>
                ))
            ) : (
                <li>Members is empty</li>
            )}
        </ul>
    );
}
