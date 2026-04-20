"use client";
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useBoardStore } from "@/store/boardStore";
import { AddTodo } from "@/types/board.types";

interface Props {
    taskId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddTodoSheet({ taskId, open, onOpenChange }: Props) {
    const addTodo = useBoardStore((s) => s.addTodo);
    const [form, setForm] = useState<AddTodo>({
        title: "",
        description: "",
        pinned: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        addTodo(taskId, form);
        setForm({ title: "", description: "", pinned: false });
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="shadow-[-40px_0_80px_0_rgba(0,0,0,0.5)] bg-[#1c1b1c] border-l-[rgba(73,68,84,0.1)] border-l border-solid max-sm:w-full!">
                <SheetHeader>
                    <SheetTitle className="font-extrabold text-2xl text-[#e5e2e3]">
                        Add Todo
                    </SheetTitle>
                </SheetHeader>

                <form
                    onSubmit={handleSubmit}
                    className="grid flex-1 auto-rows-min gap-6 px-4"
                >
                    <div className="grid gap-3">
                        <Label className="font-bold text-[10px] tracking-widest uppercase text-[#d0bcff]">
                            Title
                        </Label>
                        <Input
                            className="border border-gray-500 h-14 bg-[#0e0e0f]! px-4 rounded-xl"
                            placeholder="What needs to be done?"
                            value={form.title}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    title: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label className="font-bold text-[10px] tracking-widest uppercase text-[#d0bcff]">
                            Description
                        </Label>
                        <Textarea
                            className="border border-gray-500 bg-[#0e0e0f]! px-4 rounded-xl min-h-25"
                            placeholder="Describe the task..."
                            value={form.description}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    description: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Switch
                            id="pinned"
                            checked={form.pinned}
                            onCheckedChange={(v) =>
                                setForm((f) => ({ ...f, pinned: v }))
                            }
                        />
                        <Label
                            htmlFor="pinned"
                            className="font-bold text-[10px] tracking-widest uppercase text-[#d0bcff]"
                        >
                            Pin as Priority
                        </Label>
                    </div>

                    <SheetFooter className="flex-row gap-4 items-center justify-between">
                        <SheetClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="px-10 h-12 rounded-xl bg-[#353436] font-bold text-sm text-[#e5e2e3]"
                            >
                                Cancel
                            </Button>
                        </SheetClose>
                        <Button
                            type="submit"
                            className="px-10 h-12 bg-[#d0bcff] font-bold text-sm text-[#3c0091] rounded-xl hover:shadow-[0_10px_25px_-5px_rgba(208,188,255,0.4)]"
                        >
                            Add Todo
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
