import { TaskTag } from "@/types/board.types";

export const CANVAS_WIDTH = 3200;
export const CANVAS_HEIGHT = 2200;
export const CARD_WIDTH = 320;
export const CARD_HEIGHT = 180;
export const SNAP = 16;

export const TASK_TAGS: TaskTag[] = [
    { label: "High Priority", bg: "rgba(208, 188, 255, 0.1)", text: "#d0bcff" },
    { label: "Engineering", bg: "rgba(79, 219, 200, 0.1)", text: "#4fdbc8" },
    { label: "Planning", bg: "bg-violet-500/20", text: "text-violet-200" },
    { label: "UI", bg: "#F2E2FF", text: "#6600CC" },
    { label: "Game Design", bg: "#E2FFFF", text: "#007777" },
    { label: "UX", bg: "#FFE2F9", text: "#CC0088" },
    { label: "Weekend", bg: "#F5F5F5", text: "#666666" },
    { label: "Holidays", bg: "#FFF9E2", text: "#AA8800" },
] as const;
