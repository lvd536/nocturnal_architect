import {
    CollaborationBackground,
    CollaborationIcon,
    TaskPlanningIcon,
    TaskRowsGraphic,
    VisualStatsIcon,
    StatsBarsGraphic,
    WorkflowGraphic,
    TaskRowsGraphic2,
} from "@/components/Icons";

export default function LandingTools() {
    return (
        <div className="mt-32 px-6" id="tools">
            <div className="flex gap-1.5 flex-wrap max-w-150 font-black text-5xl tracking-tight">
                <p>Tools for the </p>
                <p className="text-[#4fdbc8]">Modern</p>
                <p className="text-[#4fdbc8]">Architect.</p>
            </div>

            <p className="mt-6 mb-16 text-[18px] leading-6 text-[#cbc3d7] max-w-151 text-start">
                We&apos;ve stripped away the noise to give you a clinical,
                high-performance planning environment.
            </p>

            <div className="flex items-stretch justify-between flex-wrap gap-4">
                <div className="flex flex-col items-start justify-between relative text-start border p-8 bg-[#1c1b1c] rounded-3xl border-solid border-[rgba(73,68,84,0.1)] max-sm:w-full sm:min-w-1/2">
                    <div className="flex items-center justify-center rounded-[12px] w-12 h-12 mb-3 bg-[rgba(208,188,255,0.1)]">
                        <CollaborationIcon />
                    </div>

                    <p className="font-bold text-[24px] leading-[133%] text-[#e5e2e3]">
                        Real-time Collaboration
                    </p>

                    <p className="leading-6 text-[#cbc3d7] max-w-112.5 mt-4">
                        Multi-player canvas with zero latency. See every change,
                        and every spark of genius as it happens.
                    </p>

                    <CollaborationBackground className="absolute -top-5 -right-5 z-1" />

                    <div className="flex gap-2">
                        <div className="border w-17.25 h-6.5 px-3 py-1 rounded-full border-solid border-[rgba(73,68,84,0.2)] font-normal text-center text-xs leading-[133%] text-[#e5e2e3] mt-4 bg-[#2a2a2b]">
                            Fast
                        </div>
                        <div className="border w-17.25 h-6.5 px-3 py-1 rounded-full border-solid border-[rgba(73,68,84,0.2)] font-normal text-center text-xs leading-[133%] text-[#e5e2e3] mt-4 bg-[#2a2a2b]">
                            Secure
                        </div>
                    </div>
                </div>

                <div className="relative text-start border p-8 h-fit bg-[#1c1b1c] rounded-3xl border-solid border-[rgba(73,68,84,0.1)]">
                    <div className="flex items-center justify-center rounded-[12px] w-12 h-12 mb-3 bg-[rgba(79,219,200,0.1)]">
                        <TaskPlanningIcon />
                    </div>

                    <p className="font-bold text-[24px] leading-[133%] text-[#e5e2e3]">
                        Task Planning
                    </p>

                    <p className="leading-6 text-[#cbc3d7] max-w-112.5 mt-4">
                        Intuitive tagging system and hierarchy that grows with
                        your project scale.
                    </p>

                    <TaskRowsGraphic2 className="mt-8 max-sm:hidden" />
                    <TaskRowsGraphic className="max-sm:hidden" />
                </div>

                <div className="relative text-start border p-8 bg-[#1c1b1c] rounded-3xl border-solid border-[rgba(73,68,84,0.1)] h-75 max-sm:h-fit">
                    <div className="flex items-center justify-center rounded-[12px] w-12 h-12 mb-3 bg-[rgba(219,184,255,0.1)]">
                        <VisualStatsIcon />
                    </div>

                    <p className="font-bold text-[24px] leading-[133%] text-[#e5e2e3]">
                        Visual Stats
                    </p>

                    <p className="leading-6 text-[#cbc3d7] max-w-112.5 mt-4">
                        Understand velocity at a glance with our integrated
                        analytical engine.
                    </p>

                    <StatsBarsGraphic className="max-sm:hidden" />
                </div>

                <div className="relative flex items-center gap-6 text-start p-8 bg-[rgba(53,52,54,0.4)] rounded-3xl border border-solid border-[rgba(73,68,84,0.2)] h-75 max-sm:h-fit">
                    <div>
                        <p className="font-bold text-[24px] leading-[133%] text-[#e5e2e3]">
                            Asymmetric Workflow
                        </p>

                        <p className="leading-6 text-[#cbc3d7] max-w-112.5 mt-4">
                            Break free from the rigid grid. Our canvas allows
                            you to structure projects based on their unique
                            narrative, not a template.
                        </p>
                    </div>

                    <WorkflowGraphic className="max-sm:hidden" />
                </div>
            </div>
        </div>
    );
}
