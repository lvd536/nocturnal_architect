import { IconProps } from "@/types/icons.types";

export default function StatsBarsGraphic({ className }: IconProps) {
    return (
        <svg
            className={className}
            width="329"
            height="96"
            viewBox="0 0 329 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0 58C0 56.8954 0.895431 56 2 56H74.1667C75.2712 56 76.1667 56.8954 76.1667 58V96H0V58Z"
                fill="#DBB8FF"
                fillOpacity="0.2"
            />
            <path
                d="M84.1667 38C84.1667 36.8954 85.0621 36 86.1667 36H158.333C159.438 36 160.333 36.8954 160.333 38V96H84.1667V38Z"
                fill="#DBB8FF"
                fillOpacity="0.4"
            />
            <path
                d="M168.333 18C168.333 16.8954 169.229 16 170.333 16H242.5C243.605 16 244.5 16.8954 244.5 18V96H168.333V18Z"
                fill="#DBB8FF"
            />
            <path
                d="M252.5 44.6699C252.5 43.5654 253.395 42.6699 254.5 42.6699H326.667C327.771 42.6699 328.667 43.5654 328.667 44.6699V95.9999H252.5V44.6699Z"
                fill="#DBB8FF"
                fillOpacity="0.6"
            />
        </svg>
    );
}
