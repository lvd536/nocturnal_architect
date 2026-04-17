"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useBoardStore } from "@/store/boardStore";
import { useShallow } from "zustand/react/shallow";
import { Task, Todo } from "@/types/board.types";

export function RealtimeSync() {
    const supabase = createClient();

    const {
        addTaskFromRemote,
        updateTaskFromRemote,
        deleteTaskFromRemote,
        addTodoFromRemote,
        updateTodoFromRemote,
        deleteTodoFromRemote,
        tasks,
    } = useBoardStore(
        useShallow((s) => ({
            addTaskFromRemote: s.addTaskFromRemote,
            updateTaskFromRemote: s.updateTaskFromRemote,
            deleteTaskFromRemote: s.deleteTaskFromRemote,
            addTodoFromRemote: s.addTodoFromRemote,
            updateTodoFromRemote: s.updateTodoFromRemote,
            deleteTodoFromRemote: s.deleteTodoFromRemote,
            tasks: s.tasks,
        })),
    );

    useEffect(() => {
        const channel = supabase
            .channel("db-changes")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "tasks" },
                (payload) => {
                    if (payload.eventType === "INSERT")
                        addTaskFromRemote(payload.new as Task);
                    if (payload.eventType === "UPDATE")
                        updateTaskFromRemote(payload.new as Task);
                    if (payload.eventType === "DELETE")
                        deleteTaskFromRemote(payload.old.id);
                },
            )
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "todos" },
                (payload) => {
                    if (payload.eventType === "INSERT")
                        addTodoFromRemote(
                            payload.new.task_id,
                            payload.new as Todo,
                        );
                    if (payload.eventType === "UPDATE")
                        updateTodoFromRemote(
                            payload.new.task_id,
                            payload.new as Todo,
                        );
                    if (payload.eventType === "DELETE") {
                        const taskId = tasks.find((t) =>
                            t.todos.some((todo) => todo.id === payload.old.id),
                        )?.id;
                        if (taskId)
                            deleteTodoFromRemote(taskId, payload.old.id);
                    }
                },
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks]);

    return null;
}
