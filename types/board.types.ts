export type Board = {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    tasks: Task[];
};

export type Task = {
    id: string;
    title: string;
    color: string;
    done: boolean;
    due_date: string | null;
    created_at?: string;
    updated_at?: string;
    x: number;
    y: number;
    todos: Todo[];
    tags: TaskTag[];
};

export type Todo = {
    id: string;
    taskId: string;
    title: string;
    description: string;
    tag: string | null;
    order: number;
    done: boolean;
    pinned: boolean;
    created_at?: string;
    updated_at?: string;
};

export type TaskTag = {
    id?: string;
    label: string;
    bg: string;
    text: string;
};

export type AddTask = {
    title: string;
    color: string;
    done: boolean;
    dueDate?: string | null;
};

export interface AddTodo {
    title: string;
    description: string;
    pinned: boolean;
}
