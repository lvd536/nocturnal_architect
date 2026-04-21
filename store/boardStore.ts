import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { Task, AddTask, AddTodo, TaskTag, Todo } from "@/types/board.types";
import { clamp } from "@/helpers/math.helpers";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    CARD_HEIGHT,
    CARD_WIDTH,
} from "@/consts/todo.consts";
import * as tasksService from "@/actions/supabase/board";

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

    addTaskFromRemote: (newTask: Task) => void;
    updateTaskFromRemote: (updatedTask: Task) => void;
    deleteTaskFromRemote: (id: string) => void;

    addTodoFromRemote: (taskId: string, newTodo: Todo) => void;
    updateTodoFromRemote: (taskId: string, updatedTodo: Todo) => void;
    deleteTodoFromRemote: (taskId: string, todoId: string) => void;

    addTodo: (taskId: string, data: AddTodo) => Promise<void>;
    deleteTodo: (taskId: string, todoId: string) => Promise<void>;
    moveTodo: (
        sourceTaskId: string,
        targetTaskId: string,
        todoId: string,
        targetIndex: number,
    ) => void;

    setDraggingId: (id: string | null) => void;

    setBoardId: (boardId: string | null) => void;
    clearBoard: () => void;
}

const updateTaskTimers = new Map<string, ReturnType<typeof setTimeout>>();
const updatePositionTimers = new Map<string, ReturnType<typeof setTimeout>>();

export const useBoardStore = create<BoardState>()(
    persist(
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

                const task: Omit<Task, "id" | "done_in"> = {
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
                    due_date: now,
                    created_at: now,
                };

                try {
                    const newTaskId = await tasksService.createTask(
                        boardId,
                        task,
                    );
                    const newTask: Omit<Task, "done_in"> = {
                        id: newTaskId,
                        ...task,
                    };
                    set((state) => ({
                        tasks: !state.tasks.some((t) => t.id === newTaskId)
                            ? [...state.tasks, newTask]
                            : state.tasks,
                    }));
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

                if (updatePositionTimers.has(id)) {
                    clearTimeout(updatePositionTimers.get(id)!);
                }

                const timer = setTimeout(async () => {
                    updatePositionTimers.delete(id);
                    try {
                        await tasksService.updateTask(id, { x, y });
                    } catch (error) {
                        console.error(error);
                    }
                }, 250);

                updatePositionTimers.set(id, timer);
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

                if (updateTaskTimers.has(id)) {
                    clearTimeout(updateTaskTimers.get(id)!);
                }

                const timer = setTimeout(async () => {
                    updateTaskTimers.delete(id);
                    try {
                        await tasksService.updateTask(id, patch);
                    } catch (e) {
                        console.error(e);
                    }
                }, 700);

                updateTaskTimers.set(id, timer);
            },

            addTaskFromRemote: (newTask: Task) =>
                set((state) => ({
                    tasks: state.tasks.some((t) => t.id === newTask.id)
                        ? state.tasks
                        : [...state.tasks, newTask],
                })),

            updateTaskFromRemote: (updatedTask: Task) =>
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === updatedTask.id
                            ? { ...t, ...updatedTask, todos: t.todos ?? [] }
                            : t,
                    ),
                })),

            deleteTaskFromRemote: (id: string) =>
                set((state) => ({
                    tasks: state.tasks.filter((t) => t.id !== id),
                })),

            addTodoFromRemote: (taskId: string, newTodo: Todo) =>
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === taskId
                            ? {
                                  ...t,
                                  todos: t.todos?.some(
                                      (todo) => todo.id === newTodo.id,
                                  )
                                      ? t.todos || []
                                      : [...[t.todos ?? []], newTodo],
                              }
                            : t,
                    ),
                })),

            updateTodoFromRemote: (newTaskId: string, updatedTodo: Todo) =>
                set((state) => {
                    const { tasks } = state;
                    const task = tasks.find((t) => t.id === newTaskId);

                    if (!tasks || !task || !updatedTodo) return;
                    else if (!task.todos || task.todos.length < 1) {
                        return {
                            tasks: tasks.map((t) =>
                                t.id === newTaskId
                                    ? {
                                          ...t,
                                          todos: [updatedTodo],
                                      }
                                    : t,
                            ),
                        };
                    }

                    const cleanedTasks = tasks.map((t) => ({
                        ...t,
                        todos:
                            t.todos?.filter(
                                (todo) => todo.id !== updatedTodo.id,
                            ) || [],
                    }));

                    return {
                        tasks: cleanedTasks.map((t) =>
                            t.id === newTaskId
                                ? {
                                      ...t,
                                      todos:
                                          [...t.todos, updatedTodo].sort(
                                              (a, b) =>
                                                  (a.order_index ?? 0) -
                                                  (b.order_index ?? 0),
                                          ) || [],
                                  }
                                : t,
                        ),
                    };
                }),

            deleteTodoFromRemote: (taskId: string, todoId: string) =>
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === taskId
                            ? {
                                  ...t,
                                  todos:
                                      t.todos?.filter(
                                          (todo) => todo.id !== todoId,
                                      ) || [],
                              }
                            : t,
                    ),
                })),

            addTodo: async (taskId, data) => {
                const taskIndex = get().tasks.findIndex((t) => t.id === taskId);
                if (taskIndex === -1) return;

                const task = get().tasks[taskIndex];
                const now = new Date().toISOString();

                const todo: Omit<Todo, "id"> = {
                    taskId,
                    title: data.title,
                    description: data.description,
                    done: false,
                    pinned: data.pinned,
                    order_index: task.todos?.length + 1 || 0,
                    tag: "",
                    created_at: now,
                };

                try {
                    const newTodoId = await tasksService.createTodo(
                        taskId,
                        todo as Todo,
                    );
                    const newTodo: Todo = {
                        id: newTodoId,
                        ...todo,
                    };
                    set((state) => ({
                        tasks: state.tasks.map((t) =>
                            t.id === taskId &&
                            !t.todos?.some((td) => td.id === newTodoId)
                                ? { ...t, todos: [...(t.todos || []), newTodo] }
                                : t,
                        ),
                    }));
                } catch (error) {
                    console.error("Ошибка при добавлении туду:", error);
                }
            },

            deleteTodo: async (_taskId, todoId) => {
                set((s) => {
                    const task = s.tasks.find((t) =>
                        t.todos?.some((td) => td.id === todoId),
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

            moveTodo: (
                sourceTaskId: string,
                targetTaskId: string,
                todoId: string,
                targetIndex: number,
            ) => {
                set((state) => {
                    const sourceTask = state.tasks.find(
                        (t) => t.id === sourceTaskId,
                    );
                    const targetTask = state.tasks.find(
                        (t) => t.id === targetTaskId,
                    );

                    if (!sourceTask || !targetTask) return state;

                    const todoToMove = sourceTask.todos.find(
                        (todo) => todo.id === todoId,
                    );
                    if (!todoToMove) return state;

                    const newTasks = state.tasks.map((task) => {
                        if (task.id === sourceTaskId) {
                            const updatedTodos = task.todos.filter(
                                (todo) => todo.id !== todoId,
                            );

                            if (sourceTaskId === targetTaskId) {
                                const finalTodos = [...updatedTodos];
                                finalTodos.splice(targetIndex, 0, todoToMove);
                                return { ...task, todos: finalTodos };
                            }

                            return { ...task, todos: updatedTodos };
                        }

                        if (task.id === targetTaskId) {
                            const updatedTodos = [...task.todos];
                            updatedTodos.splice(targetIndex, 0, {
                                ...todoToMove,
                                taskId: targetTaskId,
                            });
                            return { ...task, todos: updatedTodos };
                        }

                        return task;
                    });

                    return { tasks: newTasks };
                });
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
        {
            name: "board-storage",
            partialize: (state) => ({
                boardId: state.boardId,
            }),
        },
    ),
);
