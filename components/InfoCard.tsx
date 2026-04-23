import { LucideIcon } from "lucide-react";

export function InfoCard({
    title,
    description,
    icon: Icon,
}: {
    title: string;
    description: string;
    icon: LucideIcon;
}) {
    return (
        <main className="flex min-h-screen items-center justify-center p-6 bg-[#0f0f10]">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 blur-[150px] bg-[#d0bcff]/10 rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg p-10 backdrop-blur-xl bg-[rgba(53,52,54,0.4)] rounded-3xl border border-white/10 shadow-2xl text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-2xl bg-[#d0bcff]/10 border border-[#d0bcff]/20">
                        <Icon className="w-10 h-10 text-[#d0bcff]" />
                    </div>
                </div>
                <h1 className="text-2xl font-extrabold text-[#e5e2e3] mb-3">
                    {title}
                </h1>
                <p className="text-sm leading-relaxed text-slate-400">
                    {description}
                </p>
            </div>
        </main>
    );
}
