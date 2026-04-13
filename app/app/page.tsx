import CanvasBoard from "@/components/Dashboard/CanvasBoard";
import { ChartAreaInteractive } from "@/components/Dashboard/ChartAreaInteractive";
import { SectionCards } from "@/components/Dashboard/SectionCards";
import { TagDistributionChart } from "@/components/Dashboard/TagDistributionChart";

export default function App() {
    return (
        <>
            {/*<SectionCards />
            <div className="w-full grid grid-cols-3 gap-4 px-4 lg:px-6">
                <ChartAreaInteractive />
                <TagDistributionChart />
            </div>*/}
            <CanvasBoard />
        </>
    );
}
