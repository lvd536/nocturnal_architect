"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTask } from "@/actions/supabase/board";
import { CalendarIcon, ChevronDownIcon, Plus } from "lucide-react";
import { useState } from "react";
import { Task } from "@/types/board.types";
import { useBoardStore } from "@/store/boardStore";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useRoleStore } from "@/store/roleStore";
import { ModalCheckMark } from "@/components/Icons";

export default function TaskCreationModal({
    children,
}: React.PropsWithChildren) {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>();
    const [date, setDate] = useState<Date | undefined>();
    const boardId = useBoardStore((s) => s.boardId);
    const { isEditor } = useRoleStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!date || !boardId || loading) return;
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const title = (formData.get("task-title") as string) || "";
        const x = Number(formData.get("task-x")) || 0;
        const y = Number(formData.get("task-y")) || 0;

        const newTask: Omit<Task, "id" | "done_in"> = {
            title,
            due_date: date.toISOString(),
            x,
            y,
            color: "#fff",
            done: false,
            tags: [],
            todos: [],
        };

        try {
            await createTask(boardId, newTask);
            setOpen(false);
        } catch (error) {
            console.error("Error creating task:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isEditor) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ? (
                    children
                ) : (
                    <Button className="w-28.5 h-9.5">
                        <Plus />
                        Add Task
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="border backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] bg-[rgba(53,52,54,0.6)] p-6 rounded-3xl border-solid border-[rgba(73,68,84,0.2)]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="relative">
                        <DialogTitle className="flex items-center gap-3">
                            <ModalCheckMark />
                            <p className="font-extrabold text-2xl leading-[133%] tracking-[-0.03em] text-[#e5e2e3]">
                                Add Task
                            </p>
                        </DialogTitle>
                        <div className="absolute -top-32 -right-32 w-64 h-64 blur-[100px] bg-[rgba(208,188,255,0.25)] rounded-full pointer-events-none" />
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label
                                className="font-bold text-xs leading-[133%] tracking-widest uppercase text-[rgba(208,188,255,0.8)] mt-4"
                                htmlFor="task-title"
                            >
                                Task Title
                            </Label>
                            <Input
                                id="task-title"
                                name="task-title"
                                defaultValue="Eat cookies"
                                className="border h-12.25 px-4 py-3.5 rounded-xl border-solid border-[rgba(73,68,84,0.2)]"
                            />
                        </Field>
                        <div className="grid gap-3">
                            <Label className="font-bold text-[10px] leading-[150%] tracking-widest uppercase text-[#d0bcff]">
                                Due date
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="flex items-center justify-between border w-full h-12.5 bg-input/30 p-2 rounded-xl border-solid border-[rgba(73,68,84,0.2)] font-semibold text-xs text-zinc-400 cursor-pointer">
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
                        <Field>
                            <FieldLabel
                                className="font-bold text-xs leading-[133%] tracking-widest uppercase text-[rgba(208,188,255,0.8)]"
                                htmlFor="task-x"
                            >
                                Pos X
                            </FieldLabel>
                            <Input
                                id="task-x"
                                name="task-x"
                                placeholder="Type pos x."
                                type="number"
                                className="w-full h-12.5 p-2 rounded-xl border-solid border-[rgba(73,68,84,0.2)] font-semibold text-xs text-zinc-400 cursor-pointer"
                            />
                        </Field>
                        <Field>
                            <FieldLabel
                                className="font-bold text-xs leading-[133%] tracking-widest uppercase text-[rgba(208,188,255,0.8)]"
                                htmlFor="task-y"
                            >
                                Pos Y
                            </FieldLabel>
                            <Input
                                id="task-y"
                                name="task-y"
                                placeholder="Type pos y."
                                type="number"
                                className="w-full h-12.5 p-2 rounded-xl border-solid border-[rgba(73,68,84,0.2)] font-semibold text-xs text-zinc-400 cursor-pointer"
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="items-center mt-4">
                        <DialogClose asChild>
                            <Button
                                variant="ghost"
                                className="font-semibold text-sm leading-[143%] text-center text-[#cbc3d7]"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={loading}
                            className="w-42.25 h-11 hover:shadow-[0_4px_6px_-4px_rgba(208,188,255,0.2),0_10px_15px_-3px_rgba(208,188,255,0.2)] bg-[#d0bcff] border-none rounded-xl font-bold text-sm leading-[143%] tracking-[0.02em] text-center text-[#340080]"
                            type="submit"
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
