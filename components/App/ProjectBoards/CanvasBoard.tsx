"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    dropTargetForElements,
    monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    CARD_HEIGHT,
    CARD_WIDTH,
} from "@/consts/todo.consts";
import { cn } from "@/lib/utils";
import { useBoardStore } from "@/store/boardStore";
import { useCanvasPan } from "@/hooks/useCanvasPan";
import { TaskCard } from "@/components/App/ProjectBoards/Task/TaskCard";
import CanvasBoardHelp from "./CanvasBoardHelp";
import { useParams, useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

export default function CanvasBoard() {
    const canvasScrollRef = useRef<HTMLDivElement | null>(null);
    const surfaceRef = useRef<HTMLDivElement | null>(null);
    const [isOverCanvas, setIsOverCanvas] = useState(false);
    const path = useParams();
    const router = useRouter();

    const { tasks, draggingId, addTask, setDraggingId, setBoardId } =
        useBoardStore(
            useShallow((s) => ({
                tasks: s.tasks,
                draggingId: s.draggingId,
                addTask: s.addTask,
                setDraggingId: s.setDraggingId,
                setBoardId: s.setBoardId,
            })),
        );

    const { isPanning, panHandlers } = useCanvasPan({
        containerRef: canvasScrollRef,
    });

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
                { title: "New task", color: "#fff", done: false },
                { x, y },
            );
        },
        [addTask],
    );

    useEffect(() => {
        if (!path.id || typeof path.id !== "string") {
            router.push("/");
            return;
        } else {
            setBoardId(path.id);
            useBoardStore.getState().loadTasks(path.id);
        }

        const surfaceEl = surfaceRef.current;
        if (!surfaceEl) return;
        return dropTargetForElements({
            element: surfaceEl,
            canDrop: ({ source }) =>
                (source.data as { kind?: string }).kind === "task",
            onDragEnter: () => setIsOverCanvas(true),
            onDragLeave: () => setIsOverCanvas(false),
            onDrop: () => setIsOverCanvas(false),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return monitorForElements({
            onDrop: () => {
                setDraggingId(null);
                setIsOverCanvas(false);
            },
        });
    }, [setDraggingId]);

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
                                {tasks &&
                                    tasks.length > 0 &&
                                    tasks.map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            isDragging={draggingId === task.id}
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
