"use client";

import {
    CalendarRange,
    ChartColumn,
    ChartNoAxesCombined,
    LayoutDashboard,
    type LucideIcon,
    Plus,
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

export function NavMain() {
    const boardId = useBoardStore((s) => s.boardId);

    const navData = [
        {
            title: "Dashboard",
            url: "/app",
            icon: LayoutDashboard,
            disabled: false,
        },
        {
            title: "Project Boards",
            url: `/app/boards/${boardId ?? "1"}/`,
            icon: ChartColumn,
            disabled: boardId === null,
        },
        {
            title: "Team Hub",
            url: `/app/boards/${boardId ?? "1"}/team`,
            icon: UsersRound,
            disabled: boardId === null,
        },
        {
            title: "Timeline",
            url: `/app/boards/${boardId ?? "1"}/calendar`,
            icon: CalendarRange,
            disabled: boardId === null,
        },
        {
            title: "Analytics",
            url: `/app/boards/${boardId ?? "1"}/stats`,
            icon: ChartNoAxesCombined,
            disabled: boardId === null,
        },
    ];

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu className="mt-2 flex flex-col gap-1">
                    {navData.map((item, index) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                className={`w-55.75 h-10 px-4 py-2.5 rounded-lg font-semibold text-sm leading-[143%] ${index === 0 ? "text-[#d0bcff] shadow-[0_0_15px_0_rgba(208,188,255,0.1)] bg-[#2a2a2b]" : "text-[#64748b]"} transition-colors duration-300`}
                                tooltip={item.title}
                                disabled={item.disabled}
                            >
                                <a
                                    className="flex gap-2 items-center"
                                    href={item.url}
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
