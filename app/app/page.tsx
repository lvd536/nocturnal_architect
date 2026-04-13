import { AppSidebar } from "@/components/Dashboard/AppSidebar";
import { ChartAreaInteractive } from "@/components/Dashboard/ChartAreaInteractive";
import { SectionCards } from "@/components/Dashboard/SectionCards";
import { SiteHeader } from "@/components/Dashboard/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TagDistributionChart } from "@/components/Dashboard/TagDistributionChart";

export default function App() {
    return (
        <TooltipProvider>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="w-full flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <SectionCards />
                                <div className="w-full grid grid-cols-3 gap-4 px-4 lg:px-6">
                                    <ChartAreaInteractive />
                                    <TagDistributionChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
}
