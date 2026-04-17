import { Trash2 } from "lucide-react";
import { Todo } from "@/types/board.types";
import { formatTime } from "@/helpers/date.helpers";
import { useBoardStore } from "@/store/boardStore";
import { useEffect, useRef } from "react";
import {
    draggable,
    dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

interface Props {
    taskId: string;
    todo: Todo;
    index: number;
}

export function TodoItem({ taskId, todo, index }: Props) {
    const ref = useRef(null);
    const deleteTodo = useBoardStore((s) => s.deleteTodo);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        return combine(
            draggable({
                element,
                getInitialData: () => ({
                    type: "todo",
                    todoId: todo.id,
                    taskId,
                    index,
                }),
            }),
            dropTargetForElements({
                element,
                getData: () => ({
                    type: "todo",
                    todoId: todo.id,
                    taskId,
                    index,
                }),
            }),
        );
    }, [taskId, todo.id, index]);

    return (
        <div
            className={
                todo.pinned
                    ? "group shadow-[0_0_20px_0_rgba(208,188,255,0.15)] bg-[#201f20] p-4 rounded-lg border-2 border-solid border-[#d0bcff]"
                    : "group border bg-[#1c1b1c] p-4 rounded-lg border-solid border-[rgba(73,68,84,0.1)]"
            }
            ref={ref}
        >
            {todo.pinned && (
                <p className="border w-18.25 h-5.25 bg-[rgba(208,188,255,0.2)] px-2 py-0.5 rounded-full border-solid border-[rgba(208,188,255,0.3)] font-bold text-[10px] leading-[150%] tracking-widest uppercase text-[#d0bcff]">
                    Priority
                </p>
            )}
            <div className="flex items-start justify-between gap-2">
                <h1 className="font-bold text-base leading-[138%] text-[#e5e2e3] my-3">
                    {todo.title}
                </h1>
                <button
                    onClick={() => deleteTodo(taskId, todo.id)}
                    className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity text-red-400/60 hover:text-red-400"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
            <p className="font-normal text-xs leading-[133%] text-[#cbc3d7]">
                {todo.description}
            </p>
            <p className="font-bold text-[10px] leading-[150%] uppercase text-slate-500 mt-6">
                {formatTime(todo.createdAt)}
            </p>
        </div>
    );
}
