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
                <SidebarMenu className="mt-2 flex flex-col gap-1">
                    {items.map((item, index) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                className={`w-55.75 h-10 px-4 py-2.5 rounded-lg font-semibold text-sm leading-[143%] ${index === 0 ? "text-[#d0bcff] shadow-[0_0_15px_0_rgba(208,188,255,0.1)] bg-[#2a2a2b]" : "text-[#64748b]"} transition-colors duration-300`}
                                tooltip={item.title}
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
