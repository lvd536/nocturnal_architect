"use client";

import { nanoid } from "nanoid";
import {
    dropTargetForElements,
    monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AddTask, Task } from "@/types/board.types";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    CARD_HEIGHT,
    CARD_WIDTH,
} from "@/consts/todo.consts";
import { TaskCard } from "./TaskCard";
import { useCanvasPan } from "@/hooks/useCanvasPan";
import { cn } from "@/lib/utils";
import { clamp } from "@/helpers/math.helpers";

const initialTodos: Task[] = [
    {
        id: "task-1",
        color: "#fff",
        createdAt: new Date().toISOString(),
        done: false,
        title: "task 1 title",
        x: 0,
        y: 0,
        todos: [
            {
                id: "todo-1",
                title: "Design landing hero",
                description:
                    "Purple + teal glass UI, strong CTA, feature grid.",
                done: false,
                order: 1,
                pinned: true,
                tag: "test tag",
                createdAt: new Date().toISOString(),
            },
            {
                id: "todo-2",
                title: "Set up auth flow",
                description:
                    "Login, register, onboarding and protected routes.",
                done: false,
                order: 2,
                pinned: false,
                tag: "test tag",
                createdAt: new Date().toISOString(),
            },
            {
                id: "todo-3",
                title: "Realtime collaboration",
                description: "Presence, live updates, shared board state.",
                done: true,
                order: 3,
                pinned: false,
                tag: "test tag",
                createdAt: new Date().toISOString(),
            },
        ],
    },
];

export default function CanvasBoard() {
    const canvasScrollRef = useRef<HTMLDivElement | null>(null);
    const surfaceRef = useRef<HTMLDivElement | null>(null);
    const [tasks, setTasks] = useState<Task[]>(initialTodos);
    const [form, setForm] = useState<AddTask>({
        title: "",
        color: "",
        done: false,
    });
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [isOverCanvas, setIsOverCanvas] = useState(false);

    const { isPanning, panHandlers } = useCanvasPan({
        containerRef: canvasScrollRef,
    });

    const addTask = useCallback(
        (data: AddTask, position?: { x: number; y: number }) => {
            const title = data.title.trim();
            if (!title) return;

            const fallbackX = 180 + tasks.length * 24;
            const fallbackY = 140 + tasks.length * 24;

            const nextTask: Task = {
                id: nanoid(),
                title,
                x: clamp(
                    position?.x ?? fallbackX,
                    0,
                    CANVAS_WIDTH - CARD_WIDTH,
                ),
                y: clamp(
                    position?.y ?? fallbackY,
                    0,
                    CANVAS_HEIGHT - CARD_HEIGHT,
                ),
                done: false,
                color: "#fff",
                todos: [],
                createdAt: new Date().toISOString(),
            };

            setTasks((current) => [...current, nextTask]);
            setForm({ title: "", color: "", done: false });
        },
        [tasks.length],
    );

    const updatePosition = useCallback((id: string, x: number, y: number) => {
        setTasks((current) =>
            current.map((todo) => (todo.id === id ? { ...todo, x, y } : todo)),
        );
    }, []);

    const toggleDone = useCallback((id: string) => {
        setTasks((current) =>
            current.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo,
            ),
        );
    }, []);

    const deleteTodo = useCallback((id: string) => {
        setTasks((current) => current.filter((todo) => todo.id !== id));
    }, []);

    const handleCanvasDoubleClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            const scrollEl = canvasScrollRef.current;
            const surfaceEl = surfaceRef.current;
            if (!scrollEl || !surfaceEl) return;

            const rect = surfaceEl.getBoundingClientRect();
            const x =
                event.clientX -
                rect.left +
                scrollEl.scrollLeft -
                CARD_WIDTH / 2;
            const y =
                event.clientY - rect.top + scrollEl.scrollTop - CARD_HEIGHT / 2;

            addTask(
                {
                    title: form.title || "New task",
                    color: form.color || "#fff",
                    done: form.done || false,
                },
                { x, y },
            );
        },
        [addTask, form.color, form.title, form.done],
    );

    useEffect(() => {
        const surfaceEl = surfaceRef.current;
        if (!surfaceEl) return;

        return dropTargetForElements({
            element: surfaceEl,
            canDrop: ({ source }) => {
                const data = source.data as { kind?: string };
                return data.kind === "task";
            },
            onDragEnter: () => setIsOverCanvas(true),
            onDragLeave: () => setIsOverCanvas(false),
            onDrop: () => setIsOverCanvas(false),
        });
    }, []);

    useEffect(() => {
        return monitorForElements({
            onDrop: () => {
                setDraggingId(null);
                setIsOverCanvas(false);
            },
        });
    }, []);

    return (
        <div className="min-h-screen text-white">
            <div className="mx-auto flex min-h-screen max-w-full flex-col gap-4 p-4 lg:p-6">
                <div className="flex-1">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
                        <div
                            ref={canvasScrollRef}
                            {...panHandlers}
                            className={cn(
                                "overflow-auto h-[90vh] overscroll-contain",
                                isPanning ? "cursor-grabbing" : "cursor-grab",
                            )}
                        >
                            <div
                                ref={surfaceRef}
                                onDoubleClick={handleCanvasDoubleClick}
                                className={[
                                    "relative",
                                    isOverCanvas
                                        ? "bg-white/4"
                                        : "bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]",
                                ].join(" ")}
                                style={{
                                    width: CANVAS_WIDTH,
                                    height: CANVAS_HEIGHT,
                                    backgroundSize: "48px 48px",
                                }}
                            >
                                {tasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        isDragging={draggingId === task.id}
                                        onToggleDone={toggleDone}
                                        onDelete={deleteTodo}
                                        onUpdatePosition={(id, x, y) => {
                                            setDraggingId(id);
                                            updatePosition(id, x, y);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <HoverCard openDelay={250}>
                            <HoverCardTrigger asChild>
                                <Button
                                    className="absolute top-2 right-2 h-10 w-10"
                                    variant="secondary"
                                >
                                    <Info />
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent
                                side="left"
                                align="start"
                                className="z-50 w-85 space-y-4 rounded-3xl border border-white/10 bg-black/90 p-4 backdrop-blur-xl"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Quick actions
                                    </h2>
                                    <p className="mt-1 text-sm text-white/55">
                                        This panel can later become a board
                                        inspector.
                                    </p>
                                </div>

                                <Card className="border-white/10 bg-white/5">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base text-white">
                                            How it works
                                        </CardTitle>
                                        <CardDescription className="text-white/50">
                                            This version is intentionally simple
                                            and buildable.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-sm text-white/70">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-violet-400" />
                                            Create todos from the top form.
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                                            Double-click anywhere on the canvas
                                            to place a todo there.
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                            Drag cards freely with Pragmatic
                                            drag and drop.
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-white/10 bg-white/5">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base text-white">
                                            Seed ideas
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {[
                                            "Design system",
                                            "Invite flow",
                                            "Realtime sync",
                                            "Stats view",
                                        ].map((item) => (
                                            <Button
                                                key={item}
                                                variant="ghost"
                                                className="h-10 w-full justify-start rounded-2xl border border-white/10 bg-white/5 px-3 text-white/75 hover:bg-white/10 hover:text-white"
                                                onClick={() =>
                                                    addTask({
                                                        title: item,
                                                        color: "#fff",
                                                        done: false,
                                                    })
                                                }
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                {item}
                                            </Button>
                                        ))}
                                    </CardContent>
                                </Card>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
