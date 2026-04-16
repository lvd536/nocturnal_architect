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
import { TaskCard } from "./Task/TaskCard";
import { useCanvasPan } from "@/hooks/useCanvasPan";
import { cn } from "@/lib/utils";
import { clamp } from "@/helpers/math.helpers";
import CanvasBoardHelp from "./CanvasBoardHelp";

const initialTodos: Task[] = [
    {
        id: "task-1",
        color: "#fff",
        createdAt: new Date().toISOString(),
        dueDate: new Date().toISOString(),
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
        tags: [],
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
                tags: [],
                dueDate: new Date().toISOString(),
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
                        <CanvasBoardHelp addTask={addTask} />
                    </div>
                </div>
            </div>
        </div>
    );
}
