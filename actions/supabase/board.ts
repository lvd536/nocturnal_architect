"use server";

import { createClient } from "@/utils/supabase/server";
import { BoardMember, Tag, Task, Todo } from "@/types/board.types";

type BoardStatsPoint = {
    date: string;
    actual: number;
    projected: number;
};

function toDayKey(dateLike?: string | null) {
    if (!dateLike) return null;

    const normalized = dateLike.includes("T")
        ? dateLike
        : dateLike.replace(" ", "T");

    const date = new Date(normalized);
    if (Number.isNaN(date.getTime())) return null;

    return date.toISOString().slice(0, 10);
}

function getLastNDays(days: number) {
    const result: string[] = [];
    const now = new Date();
    const cursor = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );

    cursor.setUTCDate(cursor.getUTCDate() - days + 1);

    for (let i = 0; i < days; i++) {
        result.push(cursor.toISOString().slice(0, 10));
        cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    return result;
}

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
    task: Omit<Task, "id" | "done_in">,
) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("tasks")
        .insert({
            board_id: boardId,
            title: task.title,
            color: task.color,
            x: task.x,
            y: task.y,
            done: task.done,
            due_date: task.due_date,
            created_at: task.created_at,
        })
        .select()
        .single();

    if (error || !data.id) throw error ?? new Error("Can't get task id");

    return data.id as string;
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

export async function createTodo(taskId: string, todo: Todo) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("todos")
        .insert({
            task_id: taskId,
            title: todo.title,
            description: todo.description,
            done: todo.done,
            pinned: todo.pinned,
            order_index: todo.order_index,
            tag: todo.tag,
            created_at: todo.created_at,
        })
        .select()
        .single();

    if (error || !data.id) throw error ?? new Error("Can't get todo id");

    return data.id as string;
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

export async function getBoardStats(boardId: string) {
    const supabase = await createClient();

    const { data: tasks, error: tasksError } = await supabase
        .from("tasks")
        .select("id, done, due_date, done_in, created_at, updated_at, board_id")
        .eq("board_id", boardId)
        .order("updated_at", { ascending: false });

    if (tasksError || !tasks) return;

    const { data: tags, error: tagsError } = await supabase
        .from("tags")
        .select("*")
        .eq("board_id", boardId);

    if (tagsError) return;

    const tagIds = tags.map((tag) => (tag as Tag).id);

    const { data: taskTags, error: taskTagsError } = await supabase
        .from("task_tags")
        .select("task_id, tag_id")
        .in(
            "tag_id",
            tagIds.length > 0
                ? tagIds
                : ["00000000-0000-0000-0000-000000000000"],
        );

    if (taskTagsError) return;

    const { count: membersCount = 0, error: membersError } = await supabase
        .from("board_members")
        .select("id", { count: "exact", head: true })
        .eq("board_id", boardId);

    if (membersError) return;

    const activeTasks = tasks.filter((t) => !t.done).length;
    const finishedTasks = tasks.filter((t) => t.done).length;

    const completionPercentage =
        tasks.length > 0 ? Math.round((finishedTasks / tasks.length) * 100) : 0;

    const tagCounts: Record<string, number> = {};

    taskTags?.forEach((tt) => {
        tagCounts[tt.tag_id] = (tagCounts[tt.tag_id] || 0) + 1;
    });

    const top5Tags = Object.entries(tagCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([id, count]) => {
            const tagInfo = tags.find((t) => t.id === id);

            return {
                id,
                label: tagInfo?.label || "Unknown",
                color: tagInfo?.bg || "#64748b",
                count,
                pct:
                    tasks.length > 0
                        ? Math.round((count / tasks.length) * 100)
                        : 0,
            };
        });

    const completedByDay = new Map<string, number>();
    const projectedByDay = new Map<string, number>();

    tasks.forEach((task) => {
        const doneKey = toDayKey(task.done_in);
        if (doneKey) {
            completedByDay.set(doneKey, (completedByDay.get(doneKey) || 0) + 1);
        }

        const dueKey = toDayKey(task.due_date);
        if (dueKey) {
            projectedByDay.set(dueKey, (projectedByDay.get(dueKey) || 0) + 1);
        }
    });

    const chartData: BoardStatsPoint[] = getLastNDays(60).map((date) => ({
        date,
        actual: completedByDay.get(date) || 0,
        projected: projectedByDay.get(date) || 0,
    }));

    return {
        tasksTotal: tasks.length,
        membersCount,
        top5Tags,
        completionPercentage,
        activeTasks,
        finishedTasks,
        chartData,
    };
}
