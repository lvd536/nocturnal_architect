"use client";

import { Activity, TrendingUp, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type Stats = {
    completionPercentage: number;
    activeTasks: number;
    membersCount: number;
};

export function SectionCards({ stats }: { stats: Stats }) {
    return (
        <div className="grid grid-cols-1 gap-6 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3 dark:*:data-[slot=card]:bg-card">
            <Card className="relative border w-74.5 h-59.5 backdrop-blur-xl bg-[rgba(53,52,54,0.4)]! p-5 rounded-2xl border-solid border-[rgba(73,68,84,0.2)]!">
                <CardHeader className="block!">
                    <CardAction className="flex items-start justify-between">
                        <svg
                            width="44"
                            height="44"
                            viewBox="0 0 44 44"
                            fill="none"
                        >
                            <rect
                                width="44"
                                height="44"
                                rx="12"
                                fill="#D0BCFF"
                                fillOpacity="0.1"
                            />
                            <path
                                d="M22 32C20.6167 32 19.3167 31.7375 18.1 31.2125C16.8833 30.6875 15.825 29.975 14.925 29.075C14.025 28.175 13.3125 27.1167 12.7875 25.9C12.2625 24.6833 12 23.3833 12 22C12 20.6167 12.2625 19.3167 12.7875 18.1C13.3125 16.8833 14.025 15.825 14.925 14.925C15.825 14.025 16.8833 13.3125 18.1 12.7875C19.3167 12.2625 20.6167 12 22 12C23.0833 12 24.1083 12.1583 25.075 12.475C26.0417 12.7917 26.9333 13.2333 27.75 13.8L26.3 15.275C25.6667 14.875 24.9917 14.5625 24.275 14.3375C23.5583 14.1125 22.8 14 22 14C19.7833 14 17.8958 14.7792 16.3375 16.3375C14.7792 17.8958 14 19.7833 14 22C14 24.2167 14.7792 26.1042 16.3375 27.6625C17.8958 29.2208 19.7833 30 22 30C24.2167 30 26.1042 29.2208 27.6625 27.6625C29.2208 26.1042 30 24.2167 30 22C30 21.7 29.9833 21.4 29.95 21.1C29.9167 20.8 29.8667 20.5083 29.8 20.225L31.425 18.6C31.6083 19.1333 31.75 19.6833 31.85 20.25C31.95 20.8167 32 21.4 32 22C32 23.3833 31.7375 24.6833 31.2125 25.9C30.6875 27.1167 29.975 28.175 29.075 29.075C28.175 29.975 27.1167 30.6875 25.9 31.2125C24.6833 31.7375 23.3833 32 22 32ZM20.6 26.6L16.35 22.35L17.75 20.95L20.6 23.8L30.6 13.775L32 15.175L20.6 26.6Z"
                                fill="#D0BCFF"
                            />
                        </svg>
                        <Badge
                            variant="ghost"
                            className="font-bold text-sm leading-[143%] text-[#4fdbc8]"
                        >
                            <TrendingUp />
                            {stats.completionPercentage}%
                        </Badge>
                    </CardAction>
                    <div className="absolute top-0 right-0 w-32 h-32 blur-3xl bg-[rgba(208,188,255,0.05)] rounded-full" />
                </CardHeader>
                <CardFooter className="flex flex-col items-start gap-1 justify-end bg-transparent! border-none h-full">
                    <CardDescription className="font-bold text-xs leading-[133%] tracking-widest uppercase text-slate-400">
                        Task Completion Rate
                    </CardDescription>
                    <CardTitle className="font-extrabold text-6xl leading-[100%] text-[#d0bcff] text-shadow-[0_0_15px_rgba(208,188,255,0.3)]!">
                        {stats.completionPercentage}%
                    </CardTitle>
                </CardFooter>
            </Card>

            <Card className="relative border w-74.5 h-59.5 backdrop-blur-xl bg-[rgba(53,52,54,0.4)]! p-5 rounded-2xl border-solid border-[rgba(73,68,84,0.2)]!">
                <CardHeader className="block!">
                    <CardAction className="flex items-start justify-between">
                        <Activity className="h-11 w-11 text-[#4fdbc8]" />
                        <Badge
                            variant="ghost"
                            className="font-bold text-sm leading-[143%] text-[#4fdbc8]"
                        >
                            Live
                        </Badge>
                    </CardAction>
                    <div className="absolute top-0 right-0 w-32 h-32 blur-3xl bg-[rgba(208,188,255,0.05)] rounded-full" />
                </CardHeader>
                <CardFooter className="flex flex-col items-start gap-1 justify-end bg-transparent! border-none h-full">
                    <CardDescription className="font-bold text-xs leading-[133%] tracking-widest uppercase text-slate-400">
                        Active Tasks
                    </CardDescription>
                    <CardTitle className="font-extrabold text-6xl leading-[100%] text-[#4fdbc8] text-shadow-[0_0_15px_rgba(79,219,200,0.3)]!">
                        {stats.activeTasks}
                    </CardTitle>
                </CardFooter>
            </Card>

            <Card className="relative border w-74.5 h-59.5 backdrop-blur-xl bg-[rgba(53,52,54,0.4)]! p-5 rounded-2xl border-solid border-[rgba(73,68,84,0.2)]!">
                <CardHeader className="block!">
                    <CardAction className="flex items-start justify-between">
                        <UsersRound className="h-11 w-11 text-[#d0bcff]" />
                        <Badge
                            variant="ghost"
                            className="font-bold text-sm leading-[143%] text-[#d0bcff]"
                        >
                            Board
                        </Badge>
                    </CardAction>
                    <div className="absolute top-0 right-0 w-32 h-32 blur-3xl bg-[rgba(208,188,255,0.05)] rounded-full" />
                </CardHeader>
                <CardFooter className="flex flex-col items-start gap-1 justify-end bg-transparent! border-none h-full">
                    <CardDescription className="font-bold text-xs leading-[133%] tracking-widest uppercase text-slate-400">
                        Team Size
                    </CardDescription>
                    <CardTitle className="font-extrabold text-6xl leading-[100%] text-[#d0bcff] text-shadow-[0_0_15px_rgba(208,188,255,0.3)]!">
                        {stats.membersCount}
                    </CardTitle>
                </CardFooter>
            </Card>
        </div>
    );
}
