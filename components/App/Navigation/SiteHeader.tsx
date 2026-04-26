"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

function getPathTitle(pathname: string) {
    const currentPath = pathname.split("/").at(-1);
    switch (currentPath) {
        case "app":
            return "Dashboard";
        case "calendar":
            return "Board Calendar";
        case "stats":
            return "Board Stats";
        case "team":
            return "Board Team";
        case "settings":
            return "Settings";
        default:
            return "Board";
    }
}

export function SiteHeader() {
    const pathname = usePathname();
    const title = getPathTitle(pathname);

    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4 mt-1.5 w-px!"
                />
                <h1 className="text-base font-medium">{title}</h1>
            </div>
        </header>
    );
}
