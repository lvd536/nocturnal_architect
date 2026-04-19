import { IconProps } from "@/types/icons.types";

export default function WorkflowGraphic({ className }: IconProps) {
    return (
        <svg
            className={className}
            width="256"
            height="192"
            viewBox="0 0 256 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="256" height="192" rx="16" fill="#0E0E0F" />
            <rect
                x="0.5"
                y="0.5"
                width="255"
                height="191"
                rx="15.5"
                stroke="#494454"
                strokeOpacity="0.2"
            />
            <rect
                x="18"
                y="18"
                width="220"
                height="156"
                rx="11"
                stroke="#494454"
                strokeOpacity="0.3"
                strokeWidth="2"
                strokeDasharray="6 4"
            />
            <g filter="url(#filter0_f_1_126)">
                <rect
                    x="33"
                    y="33"
                    width="48"
                    height="48"
                    rx="8"
                    fill="#D0BCFF"
                    fillOpacity="0.2"
                />
            </g>
            <g filter="url(#filter1_f_1_126)">
                <rect
                    x="143"
                    y="127"
                    width="64"
                    height="32"
                    rx="8"
                    fill="#4FDBC8"
                    fillOpacity="0.2"
                />
            </g>
            <defs>
                <filter id="filter0_f_1_126">
                    <feGaussianBlur stdDeviation="6" />
                </filter>
                <filter id="filter1_f_1_126">
                    <feGaussianBlur stdDeviation="6" />
                </filter>
            </defs>
        </svg>
    );
}
