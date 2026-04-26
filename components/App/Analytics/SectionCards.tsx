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
import { StatsCompletionRate } from "@/components/Icons";

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
                        <StatsCompletionRate />
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
