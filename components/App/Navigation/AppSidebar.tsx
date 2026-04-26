"use client";

import { BrainCog } from "lucide-react";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "next-view-transitions";
import BoardStatus from "./BoardStatus";

interface SidebarUser {
    email: string;
    name: string;
    avatar: string;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user: SidebarUser;
}

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
                            <Link href="/">
                                <BrainCog className="size-5! text-[#d0bcff]" />
                                <span className="text-base font-semibold text-[#d0bcff]">
                                    Nocturnal Architect
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                <BoardStatus />
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
