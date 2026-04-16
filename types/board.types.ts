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
    dueDate: string | null;
    createdAt: string;
    x: number;
    y: number;
    todos: Todo[];
    tags: TaskTag[];
};

export type Todo = {
    id: string;
    title: string;
    description: string;
    tag: string | null;
    order: number;
    done: boolean;
    pinned: boolean;
    createdAt: string;
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
