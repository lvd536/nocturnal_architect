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
import { ModalCheckMark } from "@/components/Icons";

interface Props {
    task: Task;
    taskTags?: TaskTag[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TaskEditSheet({ task, taskTags, open, onOpenChange }: Props) {
    const updateTask = useBoardStore((s) => s.updateTask);
    const [title, setTitle] = useState(task.title);
    const [date, setDate] = useState<Date | undefined>(
        task.due_date ? new Date(task.due_date) : undefined,
    );
    const [tags, setTags] = useState<TaskTag[]>(taskTags || []);

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
            <SheetContent className="shadow-[-40px_0_80px_0_rgba(0,0,0,0.5)] bg-[#1c1b1c] border-l-[rgba(73,68,84,0.1)] border-l border-solid max-sm:w-full!">
                <SheetHeader className="relative">
                    <SheetTitle className="flex items-center gap-3">
                        <ModalCheckMark />
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
                        <TaskTagPicker
                            value={tags}
                            onChange={setTags}
                            taskId={task.id}
                        />
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
