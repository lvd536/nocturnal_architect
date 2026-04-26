"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useBoardMembers } from "@/hooks/useBoardMembers";
import { TeamMember } from "./TeamMember";
import { kickUser, updateUserRole } from "@/actions/supabase/board";
import { useRouter } from "next/navigation";
import useRemoteUser from "@/hooks/useRemoteUser";

export default function TeamMembersList() {
    const { members, loading, error } = useBoardMembers();
    const { user, loading: userLoading, error: userError } = useRemoteUser();
    const router = useRouter();

    const handleKick = async (id: string) => {
        const { error } = await kickUser(id);

        if (error) router.push("/info/error");
    };

    const handleUpdate = async (
        id: string,
        role: "owner" | "editor" | "viewer",
    ) => {
        const { error } = await updateUserRole(id, role);

        if (error) router.push("/info/error");
    };

    if (loading || userLoading)
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

    if (error || userError)
        return (
            <div className="w-full text-center text-foreground/80 text-xl">
                {error}
            </div>
        );

    return (
        <ul className="flex gap-4 items-stretch flex-wrap">
            {members && members.length > 0 ? (
                members.map((member) => (
                    <TeamMember
                        key={member.id}
                        member={member}
                        onKick={handleKick}
                        onUpdateRole={handleUpdate}
                        isCurrentUser={user?.id === member.user_id}
                    />
                ))
            ) : (
                <li>Members is empty</li>
            )}
        </ul>
    );
}
