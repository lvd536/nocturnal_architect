import { TaskTag } from "@/types/board.types";

export const CANVAS_WIDTH = 3200;
export const CANVAS_HEIGHT = 2200;
export const CARD_WIDTH = 320;
export const CARD_HEIGHT = 180;
export const SNAP = 16;

export const TASK_TAGS: TaskTag[] = [
    { label: "High Priority", bg: "rgba(208, 188, 255, 0.1)", text: "#d0bcff" },
    { label: "Engineering", bg: "rgba(79, 219, 200, 0.1)", text: "#4fdbc8" },
    { label: "Planning", bg: "rgba(167, 139, 250, 0.1)", text: "#a78bfa" },
    { label: "UI", bg: "rgba(192, 132, 252, 0.1)", text: "#c084fc" },
    { label: "Game Design", bg: "rgba(34, 211, 238, 0.1)", text: "#22d3ee" },
    { label: "UX", bg: "rgba(251, 113, 133, 0.1)", text: "#fb7185" },
    { label: "Weekend", bg: "rgba(156, 163, 175, 0.1)", text: "#9ca3af" },
    { label: "Holidays", bg: "rgba(251, 191, 36, 0.1)", text: "#fbbf24" },
] as const;
