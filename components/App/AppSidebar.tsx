"use client";

import * as React from "react";
import {
    BrainCog,
    CalendarRange,
    ChartColumn,
    ChartNoAxesCombined,
    LayoutDashboard,
    Settings,
    UsersRound,
} from "lucide-react";

import { NavMain } from "@/components/App/NavMain";
import { NavUser } from "@/components/App/NavUser";
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

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/app",
            icon: LayoutDashboard,
        },
        {
            title: "Project Boards",
            url: "/app/boards/1/",
            icon: ChartColumn,
        },
        {
            title: "Team Hub",
            url: "/app/boards/1/team",
            icon: UsersRound,
        },
        {
            title: "Timeline",
            url: "/app/boards/1/calendar",
            icon: CalendarRange,
        },
        {
            title: "Analytics",
            url: "/app/boards/1/stats",
            icon: ChartNoAxesCombined,
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
    ],
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
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
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
