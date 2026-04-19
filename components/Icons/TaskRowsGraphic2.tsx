import { IconProps } from "@/types/icons.types";

export default function TaskRowsGraphic2({ className }: IconProps) {
    return (
        <div className={className}>
            <svg
                width="329"
                height="40"
                viewBox="0 0 329 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="328.667" height="40" rx="8" fill="#2A2A2B" />
                <rect
                    x="0.5"
                    y="0.5"
                    width="327.667"
                    height="39"
                    rx="7.5"
                    stroke="#494454"
                    strokeOpacity="0.1"
                />
                <rect
                    x="17"
                    y="16"
                    width="8"
                    height="8"
                    rx="4"
                    fill="#D0BCFF"
                />
                <rect
                    x="37"
                    y="16"
                    width="96"
                    height="8"
                    rx="4"
                    fill="#494454"
                    fillOpacity="0.4"
                />
            </svg>
        </div>
    );
}
