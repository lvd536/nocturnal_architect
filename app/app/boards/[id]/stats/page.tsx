import { ChartAreaInteractive } from "@/components/App/Analytics/ChartAreaInteractive";
import { SectionCards } from "@/components/App/Analytics/SectionCards";
import { TagDistributionChart } from "@/components/App/Analytics/TagDistributionChart";

export default function Stats() {
    return (
        <>
            <SectionCards />
            <div className="w-full grid grid-cols-3 gap-4 px-4 lg:px-6">
                <ChartAreaInteractive />
                <TagDistributionChart />
            </div>
        </>
    );
}
