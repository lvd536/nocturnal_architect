import { getBoardStats } from "@/actions/supabase/board";
import { ChartAreaInteractive } from "@/components/App/Analytics/ChartAreaInteractive";
import { SectionCards } from "@/components/App/Analytics/SectionCards";
import { TagDistributionChart } from "@/components/App/Analytics/TagDistributionChart";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function StatsPage({ params }: Props) {
    const { id } = await params;
    if (!id) return null;

    const analytics = await getBoardStats(id);
    if (!analytics) return null;

    return (
        <>
            <SectionCards
                stats={{
                    activeTasks: analytics.activeTasks,
                    completionPercentage: analytics.completionPercentage,
                    membersCount: analytics.membersCount ?? 0,
                }}
            />
            <div className="w-full grid lg:grid-cols-3 gap-4 px-4 lg:px-6">
                <ChartAreaInteractive data={analytics.chartData} />
                <TagDistributionChart
                    data={analytics.top5Tags}
                    total={analytics.tasksTotal}
                />
            </div>
        </>
    );
}
