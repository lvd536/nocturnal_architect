"use client";

import { CircleDotDashed, LogOut, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export function NavUser({
    user,
}: {
    user: {
        name: string;
        email: string;
        avatar: string;
    };
}) {
    const { isMobile } = useSidebar();

    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-white/5 data-[state=open]:text-white transition-all duration-300"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={user.avatar}
                                    alt={user.name}
                                />
                                <AvatarFallback className="rounded-lg bg-white/10 uppercase text-[10px] text-white/70">
                                    {user.name.slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold text-white/90">
                                    {user.name}
                                </span>
                                <span className="truncate text-xs text-white/40">
                                    {user.email}
                                </span>
                            </div>
                            <CircleDotDashed className="ml-auto size-4 text-white/30" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-2xl border border-white/10 bg-[rgba(30,29,32,0.8)] p-2 backdrop-blur-2xl shadow-2xl"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={8}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-2 py-2">
                                <Avatar className="h-9 w-9 rounded-lg">
                                    <AvatarImage
                                        src={user.avatar}
                                        alt={user.name}
                                    />
                                    <AvatarFallback className="rounded-lg bg-white/5 uppercase text-xs">
                                        {user.name.slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user.name}
                                    </span>
                                    <span className="truncate text-xs text-white/50">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator className="bg-white/5 my-1" />

                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={() => router.push("/app/settings")}
                                className="cursor-pointer gap-3 rounded-xl py-2.5 text-white/70 hover:bg-white/5 focus:bg-white/5"
                            >
                                <Settings size={16} />
                                <span>Settings</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator className="bg-white/5 my-1" />

                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="cursor-pointer gap-3 rounded-xl py-2.5 text-red-400/80 hover:bg-red-500/10 hover:text-red-400 focus:bg-red-500/10"
                        >
                            <LogOut size={16} />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
