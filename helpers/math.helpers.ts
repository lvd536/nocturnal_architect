import { SNAP } from "@/consts/todo.consts";

export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export function snap(value: number, step = SNAP) {
    return Math.round(value / step) * step;
}
