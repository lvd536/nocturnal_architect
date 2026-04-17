"use client";
import { useState } from "react";
import { format } from "date-fns";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, ChevronDownIcon } from "lucide-react";
import { useBoardStore } from "@/store/boardStore";
import { Task, TaskTag } from "@/types/board.types";
import TaskTagPicker from "./TaskTagPicker";

interface Props {
    task: Task;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TaskEditSheet({ task, open, onOpenChange }: Props) {
    const updateTask = useBoardStore((s) => s.updateTask);
    const [title, setTitle] = useState(task.title);
    const [date, setDate] = useState<Date | undefined>(
        task.due_date ? new Date(task.due_date) : undefined,
    );
    const [tags, setTags] = useState<TaskTag[]>(task.tags || []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        updateTask(task.id, {
            title: title.trim(),
            dueDate: date ? date.toISOString() : (task.due_date ?? undefined),
            tags,
        });
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="shadow-[-40px_0_80px_0_rgba(0,0,0,0.5)] bg-[#1c1b1c] border-l-[rgba(73,68,84,0.1)] border-l border-solid">
                <SheetHeader className="relative">
                    <SheetTitle className="flex items-center gap-3">
                        <div className="flex items-center justify-center border w-10 h-10 bg-[#2a2a2b] rounded-xl border-solid border-[rgba(73,68,84,0.2)]">
                            <svg
                                width="22"
                                height="20"
                                viewBox="0 0 22 20"
                                fill="none"
                            >
                                <path
                                    d="M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.0833 0 12.1083 0.158333 13.075 0.475C14.0417 0.791667 14.9333 1.23333 15.75 1.8L14.3 3.275C13.6667 2.875 12.9917 2.5625 12.275 2.3375C11.5583 2.1125 10.8 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18C10.5333 18 11.05 17.95 11.55 17.85C12.05 17.75 12.5333 17.6083 13 17.425L14.5 18.95C13.8167 19.2833 13.1 19.5417 12.35 19.725C11.6 19.9083 10.8167 20 10 20ZM17 18V15H14V13H17V10H19V13H22V15H19V18H17Z"
                                    fill="#D0BCFF"
                                />
                            </svg>
                        </div>
                        <p className="font-extrabold text-2xl leading-[133%] tracking-[-0.03em] text-[#e5e2e3]">
                            Edit Task
                        </p>
                    </SheetTitle>
                    <div className="absolute -top-32 -right-32 w-64 h-64 blur-[100px] bg-[rgba(208,188,255,0.25)] rounded-full pointer-events-none" />
                </SheetHeader>

                <form
                    onSubmit={handleSubmit}
                    className="grid flex-1 auto-rows-min gap-6 px-4"
                >
                    <div className="grid gap-3">
                        <Label className="font-bold text-[10px] leading-[150%] tracking-widest uppercase text-[#d0bcff]">
                            Name
                        </Label>
                        <Input
                            className="border border-gray-500 h-14 bg-[#0e0e0f]! px-4 py-4 rounded-xl border-solid"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What needs to be done?"
                            required
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label className="font-bold text-[10px] leading-[150%] tracking-widest uppercase text-[#d0bcff]">
                            Due date
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="flex items-center justify-between border w-full h-12.5 bg-[#0e0e0f] p-2 rounded-xl border-solid border-[rgba(73,68,84,0.2)] font-semibold text-xs text-zinc-400 cursor-pointer">
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
                            Tags & Labels
                        </Label>
                        <TaskTagPicker value={tags} onChange={setTags} />
                    </div>

                    <SheetFooter className="flex-row gap-4 items-center justify-between">
                        <SheetClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="px-10 h-12 py-3.5 rounded-xl bg-[#353436] font-bold text-sm text-[#e5e2e3]"
                            >
                                Cancel
                            </Button>
                        </SheetClose>
                        <Button
                            type="submit"
                            className="px-10 h-12 bg-[#d0bcff] font-bold text-sm text-[#3c0091] rounded-xl hover:shadow-[0_10px_25px_-5px_rgba(208,188,255,0.4)]"
                        >
                            Save Changes
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
