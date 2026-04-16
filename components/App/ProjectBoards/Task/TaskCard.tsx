import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    CARD_HEIGHT,
    CARD_WIDTH,
} from "@/consts/todo.consts";
import { format } from "date-fns";
import { Task } from "@/types/board.types";
import { useEffect, useRef, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Check,
    GripVertical,
    MoreHorizontal,
    Pencil,
    Plus,
    Trash2,
    ChevronDownIcon,
    Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { formatTime } from "@/helpers/date.helpers";
import { clamp, snap } from "@/helpers/math.helpers";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function TaskCard({
    task,
    isDragging,
    onToggleDone,
    onDelete,
    onUpdatePosition,
}: {
    task: Task;
    isDragging: boolean;
    onToggleDone: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdatePosition: (id: string, x: number, y: number) => void;
}) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(new Date(task.dueDate));
    const ref = useRef<HTMLDivElement | null>(null);
    const latestTaskRef = useRef(task);
    const dragOffsetRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        latestTaskRef.current = task;
    }, [task]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        return draggable({
            element: el,
            getInitialData: () => ({
                kind: "task",
                id: task.id,
            }),
            onDragStart: ({ location }) => {
                const card = latestTaskRef.current;
                dragOffsetRef.current = {
                    x: location.current.input.clientX - card.x,
                    y: location.current.input.clientY - card.y,
                };
            },
            onDrag: ({ location }) => {
                const { x, y } = dragOffsetRef.current;
                const nextX = snap(location.current.input.clientX - x);
                const nextY = snap(location.current.input.clientY - y);
                onUpdatePosition(
                    task.id,
                    clamp(nextX, 0, CANVAS_WIDTH - CARD_WIDTH),
                    clamp(nextY, 0, CANVAS_HEIGHT - CARD_HEIGHT),
                );
            },
        });
    }, [onUpdatePosition, task.id]);

    return (
        <Card
            ref={ref}
            className={[
                "absolute select-none border w-85 backdrop-blur-xl bg-[rgba(28,27,28,0.6)] p-4 rounded-xl border-solid border-[rgba(73,68,84,0.2)] transition-all",
                isDragging
                    ? "scale-[1.02] opacity-70 ring-2 ring-fuchsia-400/40"
                    : "hover:border-white/10 hover:bg-[rgba(28,27,28,0.58)]",
                task.done ? "border-emerald-400/30" : "",
            ].join(" ")}
            style={{
                left: task.x,
                top: task.y,
                width: CARD_WIDTH,
                minHeight: CARD_HEIGHT,
            }}
        >
            <CardHeader className="space-y-3 pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white shadow-sm">
                            <GripVertical className="h-4 w-4 text-white/70" />
                        </div>
                        <div>
                            <CardTitle className="text-base text-white">
                                {task.title}
                            </CardTitle>
                            <CardDescription className="text-xs text-white/45">
                                {formatTime(task.createdAt)}
                            </CardDescription>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40" align="start">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => onDelete(task.id)}
                                >
                                    <Trash2 />
                                    Delete
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        setIsSheetOpen((prev) => !prev)
                                    }
                                >
                                    <Pencil />
                                    Edit
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => onToggleDone(task.id)}
                                >
                                    <Check />
                                    {task.done ? "Undone" : "Done"}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetContent className="shadow-[-40px_0_80px_0_rgba(0,0,0,0.5)] bg-[#1c1b1c] border-l-[rgba(73,68,84,0.1)] border-l border-solid">
                            <SheetHeader className="relative">
                                <SheetTitle className="flex items-center gap-3">
                                    <div className="flex items-center justify-between border w-10 h-10 bg-[#2a2a2b] rounded-xl border-solid border-[rgba(73,68,84,0.2)]">
                                        <svg
                                            width="22"
                                            height="20"
                                            viewBox="0 0 22 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mx-auto"
                                        >
                                            <path
                                                d="M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.0833 0 12.1083 0.158333 13.075 0.475C14.0417 0.791667 14.9333 1.23333 15.75 1.8L14.3 3.275C13.6667 2.875 12.9917 2.5625 12.275 2.3375C11.5583 2.1125 10.8 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18C10.5333 18 11.05 17.95 11.55 17.85C12.05 17.75 12.5333 17.6083 13 17.425L14.5 18.95C13.8167 19.2833 13.1 19.5417 12.35 19.725C11.6 19.9083 10.8167 20 10 20V20M17 18V15H14V13H17V10H19V13H22V15H19V18H17V18M8.6 14.6L4.35 10.35L5.75 8.95L8.6 11.8L18.6 1.775L20 3.175L8.6 14.6V14.6"
                                                fill="#D0BCFF"
                                            />
                                        </svg>
                                    </div>
                                    <p className="font-extrabold text-2xl leading-[133%] tracking-[-0.03em] text-[#e5e2e3]">
                                        Edit Task
                                    </p>
                                </SheetTitle>
                                <div className="absolute -top-32 -right-32 w-64 h-64 blur-[100px] bg-[rgba(208,188,255,0.25)] rounded-full" />
                            </SheetHeader>
                            <form
                                action={(e) => console.log(e)}
                                className="grid flex-1 auto-rows-min gap-6 px-4"
                            >
                                <div className="grid gap-3">
                                    <Label
                                        className="font-bold text-[10px] leading-[150%] tracking-widest uppercase text-[#d0bcff]"
                                        htmlFor="task-title"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        className="border border-gray-500 h-14 bg-[#0e0e0f]! px-4 py-4 rounded-xl border-solid"
                                        id="task-title"
                                        defaultValue={task.title}
                                        placeholder="What needs to be done?"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label className="font-bold text-[10px] leading-[150%] tracking-widest uppercase text-[#d0bcff]">
                                        Due date
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger>
                                            <div className="flex items-center justify-between border w-full h-12.5 bg-[#0e0e0f] p-2 rounded-xl border-solid border-[rgba(73,68,84,0.2)] font-semibold text-xs leading-[133%] text-zinc-400">
                                                <CalendarIcon className="p-2 w-8 h-8 bg-[#2a2a2b] rounded-[8px]" />
                                                {date ? (
                                                    format(date, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <ChevronDownIcon />
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                defaultMonth={date}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="grid gap-3">
                                    <Label className="font-bold text-[10px] leading-[150%] tracking-widest uppercase text-[#d0bcff]">
                                        {"Tags & Labels"}
                                    </Label>
                                </div>
                            </form>
                            <SheetFooter className="flex-row gap-4 items-center justify-between">
                                <SheetClose asChild>
                                    <Button
                                        variant="outline"
                                        className="px-10 h-12 py-3.5 rounded-xl bg-[#353436] font-bold text-sm leading-[143%] text-center text-[#e5e2e3]"
                                    >
                                        Cancel
                                    </Button>
                                </SheetClose>
                                <Button
                                    type="submit"
                                    className="px-10 h-12 hover:shadow-[0_10px_25px_-5px_rgba(208,188,255,0.4)] bg-[#d0bcff] font-bold text-sm leading-[143%] text-center text-[#3c0091] rounded-xl"
                                >
                                    Edit Task
                                </Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex items-center gap-2">
                    <Badge className="bg-violet-500/20 text-violet-200">
                        Planning
                    </Badge>
                    {task.done ? (
                        <Badge className="bg-emerald-500/20 text-emerald-200">
                            Done
                        </Badge>
                    ) : (
                        <Badge className="bg-cyan-500/20 text-cyan-200">
                            Active
                        </Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
                {task.todos &&
                    task.todos.length > 0 &&
                    task.todos.map((todo) => (
                        <div
                            className={
                                todo.pinned
                                    ? "shadow-[0_0_20px_0_rgba(208,188,255,0.15)] bg-[#201f20] p-4 rounded-lg border-2 border-solid border-[#d0bcff]"
                                    : "border bg-[#1c1b1c] p-4 rounded-lg border-solid border-[rgba(73,68,84,0.1)]"
                            }
                            key={todo.id}
                        >
                            {todo.pinned && (
                                <p className="border w-18.25 h-5.25 bg-[rgba(208,188,255,0.2)] px-2 py-0.5 rounded-full border-solid border-[rgba(208,188,255,0.3)] font-bold text-[10px] leading-[150%] tracking-widest uppercase text-[#d0bcff]">
                                    Priority
                                </p>
                            )}
                            <h1 className="font-bold text-base leading-[138%] text-[#e5e2e3] my-3">
                                {todo.title}
                            </h1>
                            <p className="font-normal text-xs leading-[133%] text-[#cbc3d7]">
                                {todo.description}
                            </p>
                            <p className="font-bold text-[10px] leading-[150%] uppercase text-slate-500 mt-6">
                                {formatTime(todo.createdAt)}
                            </p>
                        </div>
                    ))}

                <Button
                    variant="default"
                    className="flex items-center justify-center border w-full h-11.5 px-0 py-3 rounded-xl border-dashed border-[rgba(73,68,84,0.3)] hover:border-[rgba(73,68,84,0.5)] font-bold text-sm leading-[143%] text-center text-slate-500 bg-transparent!"
                >
                    <Plus />
                    <p>Add Task</p>
                </Button>
            </CardContent>
        </Card>
    );
}
