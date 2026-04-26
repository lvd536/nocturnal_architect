"use client";

import {
    CalendarRange,
    ChartColumn,
    ChartNoAxesCombined,
    LayoutDashboard,
    UsersRound,
} from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useBoardStore } from "@/store/boardStore";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";

export function NavMain() {
    const boardId = useBoardStore((s) => s.boardId);
    const pathname = usePathname();

    const navData = [
        { title: "Dashboard", url: "/app", icon: LayoutDashboard },
        {
            title: "Project Boards",
            url: boardId ? `/app/boards/${boardId}` : "",
            icon: ChartColumn,
        },
        {
            title: "Team Hub",
            url: boardId ? `/app/boards/${boardId}/team` : "",
            icon: UsersRound,
        },
        {
            title: "Timeline",
            url: boardId ? `/app/boards/${boardId}/calendar` : "",
            icon: CalendarRange,
        },
        {
            title: "Analytics",
            url: boardId ? `/app/boards/${boardId}/stats` : "",
            icon: ChartNoAxesCombined,
        },
    ];

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu className="flex flex-col gap-1.5">
                    {navData.map((item, index) => {
                        const isDisabled = index > 0 && !boardId;
                        const isActive = !isDisabled && item.url === pathname;

                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    className={`
                                        h-10 px-3 rounded-xl font-medium text-sm transition-all duration-200
                                        ${
                                            isActive
                                                ? "bg-violet-500/10 text-violet-300 shadow-[0_0_20px_-5px_rgba(139,92,246,0.2)]"
                                                : "text-white/50 hover:bg-white/5 hover:text-white/80"
                                        }
                                        ${isDisabled ? "opacity-25 grayscale pointer-events-none" : "opacity-100"}
                                    `}
                                >
                                    {isDisabled ? (
                                        <div className="flex items-center gap-3">
                                            <item.icon
                                                size={18}
                                                strokeWidth={2}
                                            />
                                            <span className="tracking-wide">
                                                {item.title}
                                            </span>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.url}
                                            className="flex items-center gap-3"
                                        >
                                            <item.icon
                                                size={18}
                                                strokeWidth={isActive ? 2.5 : 2}
                                                className={
                                                    isActive
                                                        ? "text-violet-400"
                                                        : "text-inherit"
                                                }
                                            />
                                            <span className="tracking-wide">
                                                {item.title}
                                            </span>
                                        </Link>
                                    )}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
