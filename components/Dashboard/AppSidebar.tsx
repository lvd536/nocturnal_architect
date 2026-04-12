"use client";

import * as React from "react";
import {
    BrainCog,
    CalendarRange,
    Camera,
    ChartColumn,
    ChartNoAxesCombined,
    LayoutDashboard,
    Settings,
    UsersRound,
} from "lucide-react";

import { NavMain } from "@/components/Dashboard/NavMain";
import { NavUser } from "@/components/Dashboard/NavUser";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
    user: {
        name: "lvd.",
        email: "lvd@dev.com",
        avatar: "",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: LayoutDashboard,
        },
        {
            title: "Project Boards",
            url: "#",
            icon: ChartColumn,
        },
        {
            title: "Team Hub",
            url: "#",
            icon: UsersRound,
        },
        {
            title: "Timeline",
            url: "#",
            icon: CalendarRange,
        },
        {
            title: "Analytics",
            url: "#",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
