import { TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
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
                            xmlns="http://www.w3.org/2000/svg"
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
                            +12.4%
                        </Badge>
                    </CardAction>
                    <div className="absolute top-0 right-0 w-32 h-32 blur-3xl bg-[rgba(208,188,255,0.05)] rounded-full" />
                </CardHeader>
                <CardFooter className="flex flex-col items-start gap-1 justify-end bg-transparent! border-none h-full">
                    <CardDescription className="font-bold text-xs leading-[133%] tracking-widest uppercase text-slate-400">
                        Task Completion Rate
                    </CardDescription>
                    <CardTitle className="font-extrabold text-6xl leading-[100%] text-[#d0bcff] text-shadow-[0_0_15px_rgba(208,188,255,0.3)]!">
                        94.2%
                    </CardTitle>
                </CardFooter>
            </Card>
            <Card className="relative border w-74.5 h-59.5 backdrop-blur-xl bg-[rgba(53,52,54,0.4)]! p-5 rounded-2xl border-solid border-[rgba(73,68,84,0.2)]!">
                <CardHeader className="block!">
                    <CardAction className="flex items-start justify-between">
                        <svg
                            width="42"
                            height="45"
                            viewBox="0 0 42 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="42"
                                height="45"
                                rx="12"
                                fill="#4FDBC8"
                                fillOpacity="0.1"
                            />
                            <path
                                d="M18 14V12H24V14H18ZM20 25H22V19H20V25ZM21 33C19.7667 33 18.6042 32.7625 17.5125 32.2875C16.4208 31.8125 15.4667 31.1667 14.65 30.35C13.8333 29.5333 13.1875 28.5792 12.7125 27.4875C12.2375 26.3958 12 25.2333 12 24C12 22.7667 12.2375 21.6042 12.7125 20.5125C13.1875 19.4208 13.8333 18.4667 14.65 17.65C15.4667 16.8333 16.4208 16.1875 17.5125 15.7125C18.6042 15.2375 19.7667 15 21 15C22.0333 15 23.025 15.1667 23.975 15.5C24.925 15.8333 25.8167 16.3167 26.65 16.95L28.05 15.55L29.45 16.95L28.05 18.35C28.6833 19.1833 29.1667 20.075 29.5 21.025C29.8333 21.975 30 22.9667 30 24C30 25.2333 29.7625 26.3958 29.2875 27.4875C28.8125 28.5792 28.1667 29.5333 27.35 30.35C26.5333 31.1667 25.5792 31.8125 24.4875 32.2875C23.3958 32.7625 22.2333 33 21 33ZM21 31C22.9333 31 24.5833 30.3167 25.95 28.95C27.3167 27.5833 28 25.9333 28 24C28 22.0667 27.3167 20.4167 25.95 19.05C24.5833 17.6833 22.9333 17 21 17C19.0667 17 17.4167 17.6833 16.05 19.05C14.6833 20.4167 14 22.0667 14 24C14 25.9333 14.6833 27.5833 16.05 28.95C17.4167 30.3167 19.0667 31 21 31Z"
                                fill="#4FDBC8"
                            />
                        </svg>
                        <Badge
                            variant="ghost"
                            className="font-bold text-sm leading-[143%] text-[#d0bcff]"
                        >
                            <TrendingDown />
                            -4.2h
                        </Badge>
                    </CardAction>
                    <div className="absolute top-0 right-0 w-32 h-32 blur-3xl bg-[rgba(208,188,255,0.05)] rounded-full" />
                </CardHeader>
                <CardFooter className="flex flex-col items-start gap-1 justify-end bg-transparent! border-none h-full">
                    <CardDescription className="font-bold text-xs leading-[133%] tracking-widest uppercase text-slate-400">
                        Avg Time To Close
                    </CardDescription>
                    <CardTitle className="font-extrabold text-6xl leading-[100%] text-[#4fdbc8] text-shadow-[0_0_15px_rgba(79,219,200,0.3)]!">
                        18.5h
                    </CardTitle>
                </CardFooter>
            </Card>
            <Card className="relative border w-74.5 h-59.5 backdrop-blur-xl bg-[rgba(53,52,54,0.4)]! p-5 rounded-2xl border-solid border-[rgba(73,68,84,0.2)]!">
                <CardHeader className="block!">
                    <CardAction className="flex items-start justify-between">
                        <svg
                            width="40"
                            height="44"
                            viewBox="0 0 40 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="40"
                                height="44"
                                rx="12"
                                fill="#DBB8FF"
                                fillOpacity="0.1"
                            />
                            <path
                                d="M18.55 28.2L23.725 22H19.725L20.45 16.325L15.825 23H19.3L18.55 28.2ZM16 32L17 25H12L21 12H23L22 20H28L18 32H16Z"
                                fill="#DBB8FF"
                            />
                        </svg>
                        <Badge
                            variant="ghost"
                            className="font-bold text-sm leading-[143%] text-[#4fdbc8]"
                        >
                            <TrendingUp />
                            +12.4%
                        </Badge>
                    </CardAction>
                    <div className="absolute top-0 right-0 w-32 h-32 blur-3xl bg-[rgba(208,188,255,0.05)] rounded-full" />
                </CardHeader>
                <CardFooter className="flex flex-col items-start gap-1 justify-end bg-transparent! border-none h-full">
                    <CardDescription className="font-bold text-xs leading-[133%] tracking-widest uppercase text-slate-400">
                        Peak Team Activity
                    </CardDescription>
                    <CardTitle className="font-extrabold text-6xl leading-[100%] text-[#d0bcff] text-shadow-[0_0_15px_rgba(208,188,255,0.3)]!">
                        92/hr
                    </CardTitle>
                </CardFooter>
            </Card>
        </div>
    );
}
