"use client";

import { useEffect, useState } from "react";

export default function LandingNavBar() {
    const [activeBlock, setActiveBlock] = useState<string>("#info");

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            setActiveBlock(hash ? hash : "#info");
        };

        handleHashChange();

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

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
                <div className="flex flex-col justify-center items-start rounded-lg border border-[rgba(73,68,84,0.30)] bg-[#353436] w-8 h-8 overflow-hidden">
                    <div className="w-5 h-5 overflow-hidden max-w-none" />
                </div>
            </div>
        </div>
    );
}
