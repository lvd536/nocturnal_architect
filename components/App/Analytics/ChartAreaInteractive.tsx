"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
    actual: {
        label: "Actual",
        color: "var(--primary)",
    },
    projected: {
        label: "Projected",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

export function ChartAreaInteractive({
    data,
}: {
    data: { date: string; actual: number; projected: number }[];
}) {
    return (
        <Card className="@container/card col-span-2 border w-full h-112.5 backdrop-blur-xl bg-[rgba(53,52,54,0.4)] pt-8 pb-20 px-8 rounded-2xl border-solid border-[rgba(73,68,84,0.2)]">
            <CardHeader>
                <CardTitle className="font-bold text-xl leading-[140%] text-[#e5e2e3]">
                    Task Velocity Progress
                </CardTitle>
                <CardDescription>
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-normal text-sm leading-[143%] text-slate-500">
                                Momentum tracking over the current cycle
                            </span>
                        </div>
                        <div className="flex items-center gap-4 font-bold text-xs leading-[133%] text-[#e5e2e3]">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 shadow-[0_0_8px_0_rgba(79,219,200,0.5)] bg-[#4fdbc8] rounded-full" />
                                <p>Active</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-slate-700 rounded-full" />
                                <p>Projected</p>
                            </div>
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-62.5 w-full"
                >
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient
                                id="fillProjected"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop stopColor="#334155" stopOpacity="0.3" />
                                <stop
                                    offset="1"
                                    stopColor="#334155"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                            <linearGradient
                                id="fillActual"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop stopColor="#4FDBC8" stopOpacity="0.3" />
                                <stop
                                    offset="1"
                                    stopColor="#4FDBC8"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            allowDecimals={false}
                            domain={[0, "dataMax + 2"]}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value,
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />

                        <Area
                            dataKey="projected"
                            type="monotone"
                            fill="url(#fillProjected)"
                            stroke="#334166"
                            strokeWidth={"2.6px"}
                            stackId="a"
                        />
                        <Area
                            dataKey="actual"
                            type="monotone"
                            fill="url(#fillActual)"
                            stroke="var(--color-actual)"
                            strokeWidth={"2.6px"}
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
