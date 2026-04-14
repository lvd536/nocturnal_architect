"use client";

import { Card } from "@/components/ui/card";

const data = [
    { label: "Architecture", pct: 50, color: "#B8A9E8" },
    { label: "Engineering", pct: 24, color: "#4DD9AC" },
    { label: "Review", pct: 16, color: "#9B8FD4" },
    { label: "Backlog", pct: 10, color: "rgba(180,175,195,0.45)" },
];

const TOTAL = 248;
const R = 60;
const CIRC = 2 * Math.PI * R;

function buildArcs(segments: typeof data) {
    let offset = 0;
    return segments.map((seg) => {
        const dash = (seg.pct / 100) * CIRC;
        const gap = CIRC - dash;
        const arc = { dash, gap, offset };
        offset += dash;
        return arc;
    });
}

export function TagDistributionChart() {
    const arcs = buildArcs(data);

    return (
        <Card
            className="
        flex flex-col
        text-white
        p-8
      "
            style={{
                border: "1px solid rgba(73, 68, 84, 0.2)",
                borderRadius: "16px",
                width: "298px",
                height: "450px",
                backdropFilter: "blur(24px)",
                background: "rgba(53, 52, 54, 0.4)",
            }}
        >
            <h2 className="text-xl font-medium leading-tight">
                Tag Distribution
            </h2>
            <p
                className="text-sm mb-4"
                style={{ color: "rgba(180,175,195,0.85)" }}
            >
                Resource allocation by category
            </p>
            <div className="flex flex-1 items-center justify-center">
                <svg width={160} height={160} viewBox="0 0 160 160">
                    <circle
                        cx={80}
                        cy={80}
                        r={R}
                        fill="none"
                        stroke="rgba(80,75,95,0.35)"
                        strokeWidth={16}
                    />
                    {data.map((seg, i) => (
                        <circle
                            key={seg.label}
                            cx={80}
                            cy={80}
                            r={R}
                            fill="none"
                            stroke={seg.color}
                            strokeWidth={16}
                            strokeLinecap="round"
                            strokeDasharray={`${arcs[i].dash} ${arcs[i].gap}`}
                            strokeDashoffset={-arcs[i].offset}
                            transform="rotate(-90 80 80)"
                        />
                    ))}
                    <text
                        x={80}
                        y={76}
                        textAnchor="middle"
                        fontSize={26}
                        fontWeight={700}
                        fill="#fff"
                    >
                        {TOTAL}
                    </text>
                    <text
                        x={80}
                        y={94}
                        textAnchor="middle"
                        fontSize={10}
                        fontWeight={600}
                        fill="rgba(180,175,195,0.8)"
                        letterSpacing={"-0.05em"}
                    >
                        TOTAL TASKS
                    </text>
                </svg>
            </div>
            <ul className="mt-4 flex flex-col gap-3 list-none">
                {data.map((seg) => (
                    <li
                        key={seg.label}
                        className="flex items-center justify-between text-sm"
                    >
                        <span
                            className="flex items-center gap-2.5 font-semibold text-xs leading-[133%] text-[#e5e2e3]"
                            style={{ color: "rgba(230,225,240,0.9)" }}
                        >
                            <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ background: seg.color }}
                            />
                            {seg.label}
                        </span>
                        <span className="font-bold text-xs leading-[133%] text-slate-400">
                            {seg.pct}%
                        </span>
                    </li>
                ))}
            </ul>
        </Card>
    );
}
