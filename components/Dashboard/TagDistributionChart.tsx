"use client";

import { TrendingUp } from "lucide-react";
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

export const description = "A radial chart with stacked sections";

const chartData = [{ month: "january", mobile: 570, desktop: 1260 }];

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

export function TagDistributionChart() {
    const totalVisitors = chartData[0].desktop + chartData[0].mobile;

    return (
        <Card className="flex flex-col border w-80 h-112.5 backdrop-blur-xl bg-[rgba(53,52,54,0.4)] p-8 rounded-2xl border-solid border-[rgba(73,68,84,0.2)]">
            <CardHeader className="items-center pb-0">
                <CardTitle className="font-bold text-xl leading-[140%] text-[#e5e2e3]">
                    Tag Distribution
                </CardTitle>
                <CardDescription className="font-normal text-sm leading-[143%] text-slate-500">
                    Resource allocation by category
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-40"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={0}
                        endAngle={180}
                        innerRadius={50}
                        outerRadius={80}
                    >
                        <RadialBar
                            dataKey="mobile"
                            fill="var(--color-mobile)"
                            stackId="a"
                            cornerRadius={15}
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="desktop"
                            stackId="a"
                            cornerRadius={15}
                            fill="var(--color-desktop)"
                            className="stroke-transparent stroke-2"
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis
                            tick={false}
                            tickLine={false}
                            axisLine={false}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-[#e5e2e3] text-2xl font-bold leading-[133%]"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="font-bold text-[10px] uppercase fill-slate-500"
                                                >
                                                    Total Tasks
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-3 text-sm bg-transparent! border-none">
                <div className="flex w-full items-center justify-between gap-2 leading-none font-medium">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#d0bcff] rounded-full" />
                        <p className="font-semibold text-xs leading-[133%] text-[#e5e2e3]">
                            Architecture
                        </p>
                    </div>
                    <p className="font-bold text-xs leading-[133%] text-slate-400">
                        50%
                    </p>
                </div>
                <div className="flex w-full items-center justify-between gap-2 leading-none font-medium">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#4fdbc8] rounded-full" />
                        <p className="font-semibold text-xs leading-[133%] text-[#e5e2e3]">
                            Engineering
                        </p>
                    </div>
                    <p className="font-bold text-xs leading-[133%] text-slate-400">
                        24%
                    </p>
                </div>
                <div className="flex w-full items-center justify-between gap-2 leading-none font-medium">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#dbb8ff] rounded-full" />
                        <p className="font-semibold text-xs leading-[133%] text-[#e5e2e3]">
                            Review
                        </p>
                    </div>
                    <p className="font-bold text-xs leading-[133%] text-slate-400">
                        16%
                    </p>
                </div>
                <div className="flex w-full items-center justify-between gap-2 leading-none font-medium">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#353436] rounded-full" />
                        <p className="font-semibold text-xs leading-[133%] text-[#e5e2e3]">
                            Backlog
                        </p>
                    </div>
                    <p className="font-bold text-xs leading-[133%] text-slate-400">
                        10%
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
}
