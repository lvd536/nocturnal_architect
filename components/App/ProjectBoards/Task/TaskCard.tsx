"use client";
import { useEffect, useRef, useState } from "react";
import { GripVertical, Plus } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    draggable,
    dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { formatTime } from "@/helpers/date.helpers";
import { clamp, snap } from "@/helpers/math.helpers";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    CARD_HEIGHT,
    CARD_WIDTH,
} from "@/consts/todo.consts";
import { Task, TaskTag } from "@/types/board.types";
import { useBoardStore } from "@/store/boardStore";
import { TaskDropdownMenu } from "./TaskDropdownMenu";
import { TaskEditSheet } from "./TaskEditSheet";
import { AddTodoSheet } from "./AddTodoSheet";
import { TodoItem } from "./TodoItem";
import { useShallow } from "zustand/react/shallow";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { syncTodoOrderWithServer } from "@/actions/supabase/board";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { useRoleStore } from "@/store/roleStore";

interface Props {
    task: Task;
    tags: TaskTag[] | null;
    isDragging: boolean;
}

export function TaskCard({ task, tags, isDragging }: Props) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);
    const { isEditor } = useRoleStore();

    const {
        deleteTask,
        toggleDone,
        updatePosition,
        updatePositionLocal,
        setDraggingId,
        moveTodo,
    } = useBoardStore(
        useShallow((s) => ({
            deleteTask: s.deleteTask,
            toggleDone: s.toggleDone,
            updatePosition: s.updatePosition,
            updatePositionLocal: s.updatePositionLocal,
            setDraggingId: s.setDraggingId,
            moveTodo: s.moveTodo,
        })),
    );

    const ref = useRef<HTMLDivElement | null>(null);
    const latestTaskRef = useRef(task);
    const dragOffsetRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        latestTaskRef.current = task;
    }, [task]);

    useEffect(() => {
        if (!isEditor) return;
        const el = ref.current;
        if (!el) return;

        return combine(
            draggable({
                element: el,
                getInitialData: () => ({ kind: "task", id: task.id }),
                onDragStart: ({ location }) => {
                    const card = latestTaskRef.current;
                    dragOffsetRef.current = {
                        x: location.current.input.clientX - card.x,
                        y: location.current.input.clientY - card.y,
                    };
                    setDraggingId(task.id);
                },
                onDrag: ({ location }) => {
                    const { x, y } = dragOffsetRef.current;
                    const nextX = snap(location.current.input.clientX - x);
                    const nextY = snap(location.current.input.clientY - y);
                    updatePosition(
                        task.id,
                        clamp(nextX, 0, CANVAS_WIDTH - CARD_WIDTH),
                        clamp(nextY, 0, CANVAS_HEIGHT - CARD_HEIGHT),
                    );
                },
                onDrop: ({ location }) => {
                    setDraggingId(null);
                    const { x, y } = dragOffsetRef.current;
                    const nextX = snap(location.current.input.clientX - x);
                    const nextY = snap(location.current.input.clientY - y);
                    updatePosition(
                        task.id,
                        clamp(nextX, 0, CANVAS_WIDTH - CARD_WIDTH),
                        clamp(nextY, 0, CANVAS_HEIGHT - CARD_HEIGHT),
                    );
                },
            }),
            dropTargetForElements({
                element: el,
                getData: () => ({
                    type: "task",
                    taskId: task.id,
                    index: task.todos?.length,
                }),
                canDrop: ({ source }) => source.data.type === "todo",
            }),
        );
    }, [
        task.id,
        updatePosition,
        updatePositionLocal,
        setDraggingId,
        task.todos?.length,
        isEditor,
    ]);

    useEffect(() => {
        if (!isEditor) return;
        return monitorForElements({
            onDrop({ location, source }) {
                const target = location.current.dropTargets[0];
                if (!target) return;

                const sourceData = source.data;
                const targetData = target.data;

                if (sourceData.type === "todo") {
                    const todoId = sourceData.todoId as string;
                    const sourceTaskId = sourceData.taskId as string;
                    const targetTaskId = targetData.taskId as string;
                    const targetIndex = targetData.index as number;

                    if (sourceData.todoId === targetData.todoId) return;

                    moveTodo(sourceTaskId, targetTaskId, todoId, targetIndex);
                    syncTodoOrderWithServer(todoId, targetTaskId, targetIndex);
                }
            },
        });
    }, [isEditor, moveTodo]);

    return (
        <>
            <Card
                ref={ref}
                className={[
                    "absolute select-none border w-85 backdrop-blur-xl bg-[rgba(28,27,28,0.6)] p-4 rounded-xl border-solid border-[rgba(73,68,84,0.2)] transition-all",
                    isDragging
                        ? "scale-[1.02] opacity-70 ring-2 ring-fuchsia-400/40"
                        : "hover:border-white/10",
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
                            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                                <GripVertical className="h-4 w-4 text-white/70" />
                            </div>
                            <div>
                                <CardTitle className="text-base text-white">
                                    {task.title}
                                </CardTitle>
                                <CardDescription className="text-xs text-white/45">
                                    {formatTime(task.created_at)}
                                </CardDescription>
                            </div>
                        </div>

                        {isEditor && (
                            <TaskDropdownMenu
                                isDone={task.done}
                                onDelete={() => deleteTask(task.id)}
                                onEdit={() => setIsEditOpen(true)}
                                onToggleDone={() => toggleDone(task.id)}
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        {tags &&
                            tags.length > 0 &&
                            tags.map((tag, index) => (
                                <Badge
                                    key={`${tag.tag_id}-${index}`}
                                    style={{
                                        backgroundColor: tag.tags?.bg,
                                        color: tag.tags?.text_color,
                                    }}
                                    className="border-0"
                                >
                                    {tag.tags?.label}
                                </Badge>
                            ))}
                        {task.done ? (
                            <Badge className="bg-emerald-500/20 text-emerald-200">
                                Done
                            </Badge>
                        ) : (
                            <Badge className="bg-cyan-500/20 text-cyan-200">
                                Active
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                    {task.todos &&
                        task.todos.length > 0 &&
                        task.todos.map((todo, index) => (
                            <TodoItem
                                key={`task-${task.id || index}-todo-${todo.id || index}`}
                                taskId={task.id}
                                todo={todo}
                                index={index}
                            />
                        ))}

                    {isEditor && (
                        <Button
                            variant="default"
                            onClick={() => setIsAddTodoOpen(true)}
                            className="flex items-center justify-center border w-full h-11.5 px-0 py-3 rounded-xl border-dashed border-[rgba(73,68,84,0.3)] hover:border-[rgba(73,68,84,0.5)] font-bold text-sm text-center text-slate-500 bg-transparent!"
                        >
                            <Plus />
                            <p>Add Todo</p>
                        </Button>
                    )}
                </CardContent>
            </Card>

            {isEditor && (
                <>
                    <TaskEditSheet
                        task={task}
                        open={isEditOpen}
                        onOpenChange={setIsEditOpen}
                    />
                    <AddTodoSheet
                        taskId={task.id}
                        open={isAddTodoOpen}
                        onOpenChange={setIsAddTodoOpen}
                    />
                </>
            )}
        </>
    );
}
