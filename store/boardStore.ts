import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Task, AddTask, AddTodo, TaskTag, Todo } from "@/types/board.types";
import { clamp } from "@/helpers/math.helpers";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    CARD_HEIGHT,
    CARD_WIDTH,
} from "@/consts/todo.consts";
import * as tasksService from "@/actions/supabase/board";
import { debounce } from "lodash";

type TaskPatch = Partial<{
    title: string;
    dueDate: string;
    color: string;
    done: boolean;
    x: number;
    y: number;
    tags: TaskTag[];
}>;

interface BoardState {
    boardId: string | null;
    tasks: Task[];
    draggingId: string | null;
    isLoading: boolean;

    loadTasks: (boardId: string) => Promise<void>;
    addTask: (
        data: AddTask,
        position?: { x: number; y: number },
    ) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    toggleDone: (id: string) => Promise<void>;
    updatePosition: (id: string, x: number, y: number) => Promise<void>;
    updatePositionLocal: (id: string, x: number, y: number) => Promise<void>;
    updateTask: (id: string, patch: TaskPatch) => Promise<void>;
    addTodo: (taskId: string, data: AddTodo) => Promise<void>;
    deleteTodo: (taskId: string, todoId: string) => Promise<void>;
    setDraggingId: (id: string | null) => void;
    setBoardId: (boardId: string | null) => void;
    clearBoard: () => void;
}

const debouncedUpdateTask = debounce(async (id: string, patch: TaskPatch) => {
    try {
        await tasksService.updateTask(id, patch);
    } catch (error) {
        console.error("API Update Error:", error);
    }
}, 1500);

export const useBoardStore = create<BoardState>()(
    immer((set, get) => ({
        boardId: null,
        tasks: [],
        draggingId: null,
        isLoading: false,

        setBoardId: (boardId) => set({ boardId }),

        loadTasks: async (boardId: string) => {
            set((s) => {
                s.isLoading = true;
                s.boardId = boardId;
            });

            try {
                const tasks = await tasksService.fetchTasks(boardId);

                set((s) => {
                    s.tasks = tasks;
                });
            } finally {
                set((s) => {
                    s.isLoading = false;
                });
            }
        },

        addTask: async (data, position) => {
            const { tasks, boardId } = get();
            if (!boardId) return;

            const title = data.title.trim() || "New task";
            const now = new Date().toISOString();

            const fallbackX = 180 + tasks.length * 24;
            const fallbackY = 140 + tasks.length * 24;

            const task: Omit<Task, "id"> = {
                title,
                x: clamp(
                    position?.x ?? fallbackX,
                    0,
                    CANVAS_WIDTH - CARD_WIDTH,
                ),
                y: clamp(
                    position?.y ?? fallbackY,
                    0,
                    CANVAS_HEIGHT - CARD_HEIGHT,
                ),
                done: data.done ?? false,
                color: data.color || "#fff",
                todos: [],
                tags: [],
                dueDate: now,
                createdAt: now,
            };

            set((s) => {
                s.tasks.push(task as Task);
            });

            try {
                await tasksService.createTask(boardId, task);
            } catch (error) {
                console.error(error);
            }
        },

        deleteTask: async (id) => {
            set((s) => {
                s.tasks = s.tasks.filter((t) => t.id !== id);
            });

            try {
                await tasksService.deleteTask(id);
            } catch (error) {
                console.error(error);
            }
        },

        toggleDone: async (id) => {
            const currentTask = get().tasks.find((t) => t.id === id);
            if (!currentTask) return;

            const nextDone = !currentTask.done;

            set((s) => {
                const task = s.tasks.find((t) => t.id === id);
                if (task) task.done = nextDone;
            });

            try {
                await tasksService.updateTask(id, { done: nextDone });
            } catch (error) {
                console.error(error);
            }
        },

        updatePosition: async (id, x, y) => {
            set((s) => {
                const task = s.tasks.find((t) => t.id === id);
                if (task) {
                    task.x = x;
                    task.y = y;
                }
            });

            try {
                await tasksService.updateTask(id, { x, y });
            } catch (error) {
                console.error(error);
            }
        },

        updatePositionLocal: async (id, x, y) => {
            set((s) => {
                const task = s.tasks.find((t) => t.id === id);
                if (task) {
                    task.x = x;
                    task.y = y;
                }
            });
        },

        updateTask: async (id, patch) => {
            set((s) => {
                const task = s.tasks.find((t) => t.id === id);
                if (!task) return;
                Object.assign(task, patch);
            });

            const apiPatch: Partial<{
                title: string;
                done: boolean;
                dueDate: string;
                x: number;
                y: number;
                color: string;
            }> = {};

            if (patch.title !== undefined) apiPatch.title = patch.title;
            if (patch.done !== undefined) apiPatch.done = patch.done;
            if (patch.dueDate !== undefined) apiPatch.dueDate = patch.dueDate;
            if (patch.x !== undefined) apiPatch.x = patch.x;
            if (patch.y !== undefined) apiPatch.y = patch.y;
            if (patch.color !== undefined) apiPatch.color = patch.color;

            debouncedUpdateTask(id, apiPatch);
        },

        addTodo: async (taskId, data) => {
            const taskIndex = get().tasks.findIndex((t) => t.id === taskId);
            if (taskIndex === -1) return;

            const task = get().tasks[taskIndex];
            const now = new Date().toISOString();

            const todo: Omit<Todo, "id"> = {
                title: data.title,
                description: data.description,
                done: false,
                pinned: data.pinned,
                order: task.todos.length + 1,
                tag: "",
                createdAt: now,
            };

            set((s) => {
                s.tasks[taskIndex].todos.push(todo as Todo);
            });

            try {
                await tasksService.createTodo(taskId, todo as Todo);
            } catch (error) {
                console.error(error);
            }
        },

        deleteTodo: async (_taskId, todoId) => {
            set((s) => {
                const task = s.tasks.find((t) =>
                    t.todos.some((td) => td.id === todoId),
                );
                if (!task) return;

                task.todos = task.todos.filter((td) => td.id !== todoId);
            });

            try {
                await tasksService.deleteTodo(todoId);
            } catch (error) {
                console.error(error);
            }
        },

        setDraggingId: (id) =>
            set((s) => {
                s.draggingId = id;
            }),

        clearBoard: () =>
            set((s) => {
                s.boardId = null;
                s.tasks = [];
                s.draggingId = null;
                s.isLoading = false;
            }),
    })),
);
