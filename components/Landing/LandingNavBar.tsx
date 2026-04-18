"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, LayoutDashboard, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingNavBar() {
    const [activeBlock, setActiveBlock] = useState<string>("#info");
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            setActiveBlock(hash ? hash : "#info");
        };

        handleHashChange();

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    useEffect(() => {
        (async () => {
            const userData = await supabase.auth.getUser();
            const {
                data: { user },
            } = userData;

            setUser(user);
        })();
    }, [supabase]);

    const linkClass = (id: string) =>
        activeBlock === id ? "text-[#D0BCFF]" : "text-[#94A3B8]";

    const wrapperClass = (id: string) =>
        `flex pb-1 flex-col items-start border-b-2 w-fit transition-colors ${
            activeBlock === id ? "border-b-[#D0BCFF]" : "border-b-transparent"
        }`;

    return (
        <div className="fixed top-0 left-0 flex px-6 py-4.25 justify-between items-center border-b border-b-[rgba(73,68,84,0.20)] bg-[rgba(19,19,20,0.60)] shadow-[020px40px-15pxrgba(208,188,255,0.08)] w-full z-99">
            <div className="flex items-center gap-8 w-fit">
                <div className="flex flex-col items-start w-fit">
                    <p className="text-[#d0bcff] text-xl font-bold leading-7 left-0 top-0 tracking-[-0.05em]">
                        Nocturnal Architect
                    </p>
                </div>
                <div className="flex items-center gap-6 w-fit">
                    <div className={wrapperClass("#info")}>
                        <a
                            href="#info"
                            className={`${linkClass("#info")} text-sm font-medium leading-5 tracking-[-0.025em]`}
                        >
                            Info
                        </a>
                    </div>
                    <div className={wrapperClass("#tools")}>
                        <a
                            href="#tools"
                            className={`${linkClass("#tools")} text-sm font-medium leading-5 tracking-[-0.025em]`}
                        >
                            Tools
                        </a>
                    </div>
                    <div className={wrapperClass("#join")}>
                        <a
                            href="#join"
                            className={`${linkClass("#join")} text-sm font-medium leading-5 tracking-[-0.025em]`}
                        >
                            Join
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4 w-fit">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-full bg-[rgba(73,68,84,0.15)] border border-[rgba(208,188,255,0.1)] backdrop-blur-sm shadow-sm transition-all hover:bg-[rgba(73,68,84,0.25)] outline-none">
                                <p className="text-[#94A3B8] text-xs font-medium tracking-tight">
                                    {user.email}
                                </p>
                                <div className="relative">
                                    {user.user_metadata.avatar_url ? (
                                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[rgba(208,188,255,0.2)]">
                                            <Image
                                                alt="avatar"
                                                src={
                                                    user.user_metadata
                                                        .avatar_url
                                                }
                                                width={32}
                                                height={32}
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center text-[#D0BCFF] text-[10px] font-bold uppercase rounded-full border-2 border-[rgba(208,188,255,0.2)] bg-[#353436] w-8 h-8 shadow-inner">
                                            {user.email
                                                ? user.email.slice(0, 2)
                                                : "U"}
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#131314] rounded-full"></div>
                                </div>
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56 bg-[#1A1A1C] border-[rgba(73,68,84,0.4)] text-[#94A3B8] rounded-xl shadow-2xl mt-4">
                            <DropdownMenuLabel className="text-[#D0BCFF] font-bold">
                                My Account
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-[rgba(73,68,84,0.2)]" />

                            <DropdownMenuItem
                                onClick={() => router.push("/app")}
                                className="cursor-pointer focus:bg-[rgba(208,188,255,0.1)] focus:text-[#D0BCFF]"
                            >
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => router.push("/app/settings")}
                                className="cursor-pointer focus:bg-[rgba(208,188,255,0.1)] focus:text-[#D0BCFF]"
                            >
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="bg-[rgba(73,68,84,0.2)]" />

                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-400"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button
                        variant="default"
                        className="rounded-full bg-[#D0BCFF] hover:bg-[#b8a2e6] text-[#2D2345] text-xs font-bold px-6 h-9 shadow-[0_0_15px_rgba(208,188,255,0.3)]"
                    >
                        Login / Register
                    </Button>
                )}
            </div>
        </div>
    );
}
