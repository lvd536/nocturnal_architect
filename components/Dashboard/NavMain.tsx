"use client";

import { type LucideIcon, Plus } from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
    }[];
}) {
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className="mx-auto w-full">
                        <SidebarMenuButton
                            tooltip="Quick Create"
                            className="flex items-center justify-center w-full bg-[#d0bcff] h-11 font-bold text-sm leading-[143%] text-center text-[#3c0091] px-4 py-3 rounded-xl transition-colors duration-300 hover:bg-[#f1bffd] hover:text-[#3c0091]"
                        >
                            <Plus />
                            <span>New project</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu className="mt-8 flex flex-col gap-1">
                    {items.map((item, index) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                className={`w-55.75 h-10 px-4 py-2.5 rounded-lg font-semibold text-sm leading-[143%] ${index === 0 ? "text-[#d0bcff] shadow-[0_0_15px_0_rgba(208,188,255,0.1)] bg-[#2a2a2b]" : "text-[#64748b]"} transition-colors duration-300`}
                                tooltip={item.title}
                            >
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
