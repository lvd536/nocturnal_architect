import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    CARD_HEIGHT,
    CARD_WIDTH,
    SNAP,
} from "@/consts/todo.consts";
import { Task } from "@/types/board.types";
import { useEffect, useRef } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Check, GripVertical, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { formatTime } from "@/helpers/date.helpers";

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

function snap(value: number, step = SNAP) {
    return Math.round(value / step) * step;
}

export function TaskCard({
    task,
    isDragging,
    onToggleDone,
    onDelete,
    onUpdatePosition,
}: {
    task: Task;
    isDragging: boolean;
    onToggleDone: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdatePosition: (id: string, x: number, y: number) => void;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const latestTaskRef = useRef(task);
    const dragOffsetRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        latestTaskRef.current = task;
    }, [task]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        return draggable({
            element: el,
            getInitialData: () => ({
                kind: "task",
                id: task.id,
            }),
            onDragStart: ({ location }) => {
                const card = latestTaskRef.current;
                dragOffsetRef.current = {
                    x: location.current.input.clientX - card.x,
                    y: location.current.input.clientY - card.y,
                };
            },
            onDrag: ({ location }) => {
                const { x, y } = dragOffsetRef.current;
                const nextX = snap(location.current.input.clientX - x);
                const nextY = snap(location.current.input.clientY - y);
                onUpdatePosition(
                    task.id,
                    clamp(nextX, 0, CANVAS_WIDTH - CARD_WIDTH),
                    clamp(nextY, 0, CANVAS_HEIGHT - CARD_HEIGHT),
                );
            },
        });
    }, [onUpdatePosition, task.id]);

    return (
        <Card
            ref={ref}
            className={[
                "absolute select-none border w-85 backdrop-blur-xl bg-[rgba(28,27,28,0.6)] p-4 rounded-xl border-solid border-[rgba(73,68,84,0.2)] transition-all",
                isDragging
                    ? "scale-[1.02] opacity-70 ring-2 ring-fuchsia-400/40"
                    : "hover:border-white/10 hover:bg-[rgba(28,27,28,0.58)]",
                task.done ? "border-emerald-400/30" : "",
            ].join(" ")}
            style={{
                left: task.x,
                top: task.y,
                width: CARD_WIDTH,
                minHeight: CARD_HEIGHT,
            }}
        >
            <CardHeader className="space-y-3 pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white shadow-sm">
                            <GripVertical className="h-4 w-4 text-white/70" />
                        </div>
                        <div>
                            <CardTitle className="text-base text-white">
                                {task.title}
                            </CardTitle>
                            <CardDescription className="text-xs text-white/45">
                                {formatTime(task.createdAt)}
                            </CardDescription>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white/60 hover:bg-white/10 hover:text-white"
                        onClick={() => onDelete(task.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <Badge className="bg-violet-500/20 text-violet-200 hover:bg-violet-500/20">
                        Planning
                    </Badge>
                    {task.done ? (
                        <Badge className="bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/20">
                            Done
                        </Badge>
                    ) : (
                        <Badge className="bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/20">
                            Active
                        </Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
                {task.todos &&
                    task.todos.length > 0 &&
                    task.todos.map((todo) => (
                        <div
                            className={
                                todo.pinned
                                    ? "shadow-[0_0_20px_0_rgba(208,188,255,0.15)] bg-[#201f20] p-4 rounded-lg border-2 border-solid border-[#d0bcff]"
                                    : "border bg-[#1c1b1c] p-4 rounded-lg border-solid border-[rgba(73,68,84,0.1)]"
                            }
                            key={todo.id}
                        >
                            {todo.pinned && (
                                <p className="border w-18.25 h-5.25 bg-[rgba(208,188,255,0.2)] px-2 py-0.5 rounded-full border-solid border-[rgba(208,188,255,0.3)] font-bold text-[10px] leading-[150%] tracking-widest uppercase text-[#d0bcff]">
                                    Priority
                                </p>
                            )}
                            <h1 className="font-bold text-base leading-[138%] text-[#e5e2e3] my-3">
                                {todo.title}
                            </h1>
                            <p className="font-normal text-xs leading-[133%] text-[#cbc3d7]">
                                {todo.description}
                            </p>
                            <p className="font-bold text-[10px] leading-[150%] uppercase text-slate-500 mt-6">
                                {formatTime(todo.createdAt)}
                            </p>
                        </div>
                    ))}

                <div className="flex items-center justify-between gap-3">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="h-9 rounded-xl bg-white/10 text-white hover:bg-white/15"
                        onClick={() => onToggleDone(task.id)}
                    >
                        <Check className="mr-2 h-4 w-4" />
                        {task.done ? "Undone" : "Done"}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
