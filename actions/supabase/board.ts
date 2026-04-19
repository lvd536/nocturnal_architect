"use server";

import { createClient } from "@/utils/supabase/server";
import { BoardMember, Tag, Task, Todo } from "@/types/board.types";

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
        order_index: todo.order_index,
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

export async function fetchBoardMembers(
    boardId: string,
): Promise<BoardMember[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("board_members")
        .select(
            `
            *,
            profiles(*)
        `,
        )
        .eq("board_id", boardId);

    if (error) {
        console.error(error);
        throw error;
    }

    return data ?? [];
}

export async function upsertInviteLink(
    boardId: string,
    token: string,
    role: string,
) {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("create_invite_link", {
        p_board_id: boardId,
        p_token: token,
        p_role: role,
    });

    if (error) throw error;
    return data;
}

export async function handleUserInvite(token: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("accept_board_invite", {
        p_token: token,
    });

    if (error) return { error };
    return data as object;
}

export async function createTag(tag: Omit<Tag, "id" | "created_at">) {
    const supabase = await createClient();

    const { error } = await supabase.from("tags").insert(tag);

    if (error) {
        console.log(error);
        throw error;
    }
}
export async function fetchBoardTags(boardId: string) {
    const supabase = await createClient();

    const { error, data } = await supabase
        .from("tags")
        .select("*")
        .eq("board_id", boardId);

    if (error) {
        console.log(error);
        throw error;
    }

    return data || [];
}
export async function fetchTaskTags(taskId: string) {
    const supabase = await createClient();

    const { error, data } = await supabase
        .from("task_tags")
        .select("*, tasks(board_id), tags(*)")
        .eq("task_id", taskId);

    if (error) {
        console.log(error);
        throw error;
    }

    return data || [];
}
export async function addTaskTag(task_id: string, tag_id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from("task_tags").insert({
        task_id,
        tag_id,
    });

    if (error) {
        console.log(error);
        throw error;
    }
}
