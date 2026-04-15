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
    createdAt: string;
    x: number;
    y: number;
    todos: Todo[];
};

export type Todo = {
    id: string;
    title: string;
    description: string;
    tag: string;
    order: number;
    done: boolean;
    pinned: boolean;
    createdAt: string;
};

export type AddTask = Pick<Task, "title" | "color" | "done">;
