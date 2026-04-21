"use client";

import { BrainCog, LayoutDashboard } from "lucide-react";
import { NavMain } from "@/components/App/NavMain";
import { NavUser } from "@/components/App/NavUser";
import { useBoardStore } from "@/store/boardStore";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

interface SidebarUser {
    email: string;
    name: string;
    avatar: string;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user: SidebarUser;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
    const boardId = useBoardStore((s) => s.boardId);

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                        >
                            <a href="#">
                                <BrainCog className="size-5! text-[#d0bcff]" />
                                <span className="text-base font-semibold text-[#d0bcff]">
                                    Nocturnal Architect
                                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                <div className="group relative mt-4 mx-2 overflow-hidden rounded-xl border border-white/8 bg-linear-to-b from-white/4 to-transparent px-3 py-3 transition-all duration-300 hover:border-white/20">
                    {boardId && (
                        <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-violet-500/10 blur-2xl transition-opacity group-hover:opacity-100" />
                    )}

                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                            Active Project
                        </p>
                        <div
                            className={`h-1 w-1 rounded-full ${boardId ? "bg-violet-400 animate-pulse" : "bg-white/20"}`}
                        />
                    </div>

                    <div className="mt-2.5 flex items-center gap-3">
                        <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                                boardId
                                    ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                                    : "border-white/10 bg-white/5 text-white/20"
                            }`}
                        >
                            <LayoutDashboard
                                size={14}
                                className={
                                    boardId ? "opacity-100" : "opacity-40"
                                }
                            />
                        </div>

                        <div className="flex flex-col min-w-0">
                            <span
                                className={`truncate text-xs font-semibold leading-none ${boardId ? "text-white/90" : "text-white/40"}`}
                            >
                                {boardId ? "Board ID" : "Offline"}
                            </span>
                            <span className="mt-1 truncate text-[11px] text-white/50 font-mono">
                                {boardId ?? "Select a workspace"}
                            </span>
                        </div>
                    </div>

                    <div className="mt-3 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
                </div>
            </SidebarHeader>

            <SidebarContent>
                <NavMain />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
