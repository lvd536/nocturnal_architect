"use server";

import { createClient } from "@/utils/supabase/server";
import { Task, Todo } from "@/types/board.types";

export async function getBoards() {
    const supabase = await createClient();

    const { data, error } = await supabase.from("boards").select("*");

    if (error) throw error;

    return data ?? [];
}

export async function fetchTasks(boardId: string): Promise<Task[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("tasks")
        .select(
            `
            *,
            todos(*),
            task_tags(
                tag:tags(*)
            )
        `,
        )
        .eq("board_id", boardId);

    if (error) throw error;

    return data ?? [];
}

export async function createTask(
    boardId: string,
    task: Omit<Task, "id">,
): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from("tasks").insert({
        board_id: boardId,
        title: task.title,
        color: task.color,
        x: task.x,
        y: task.y,
        done: task.done,
        due_date: task.due_date,
        created_at: task.created_at,
    });

    if (error) throw error;
}

export async function updateTask(
    id: string,
    patch: Partial<{
        title: string;
        done: boolean;
        dueDate: string;
        x: number;
        y: number;
        color: string;
    }>,
): Promise<void> {
    const supabase = await createClient();

    const updateData: Record<string, unknown> = {};

    if (patch.title !== undefined) updateData.title = patch.title;
    if (patch.done !== undefined) updateData.done = patch.done;
    if (patch.dueDate !== undefined) updateData.due_date = patch.dueDate;
    if (patch.x !== undefined) updateData.x = patch.x;
    if (patch.y !== undefined) updateData.y = patch.y;
    if (patch.color !== undefined) updateData.color = patch.color;

    const { error } = await supabase
        .from("tasks")
        .update(updateData)
        .eq("id", id);

    if (error) throw error;
}

export async function deleteTask(id: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) throw error;
}

export async function deleteTodo(id: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) throw error;
}

export async function createTodo(taskId: string, todo: Todo): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from("todos").insert({
        id: todo.id,
        task_id: taskId,
        title: todo.title,
        description: todo.description,
        done: todo.done,
        pinned: todo.pinned,
        order_index: todo.order,
        tag: todo.tag,
        created_at: todo.created_at,
    });

    if (error) throw error;
}

export async function createBoard(title: string, description: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("create_board", {
        p_title: title,
        p_description: description,
    });

    if (error) {
        console.error(error);
        throw error;
    }

    return data;
}

export async function syncTodoOrderWithServer(
    todoId: string,
    targetTaskId: string,
    newOrder: number,
) {
    const supabase = await createClient();

    const { error } = await supabase.rpc("move_todo", {
        p_todo_id: todoId,
        p_target_task_id: targetTaskId,
        p_new_order: newOrder,
    });

    if (error) throw new Error(error.message);
}
