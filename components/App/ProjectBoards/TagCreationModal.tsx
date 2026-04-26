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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTag } from "@/actions/supabase/board";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Tag } from "@/types/board.types";
import { useBoardStore } from "@/store/boardStore";
import { Colorful } from "@uiw/react-color";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ModalCheckMark } from "@/components/Icons";

export default function TagCreationModal({
    children,
}: React.PropsWithChildren) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bgColor, setBgColor] = useState("#d0bcff");
    const [textColor, setTextColor] = useState("#340080");
    const boardId = useBoardStore((s) => s.boardId);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!boardId || loading) return;

        const formData = new FormData(e.currentTarget);
        const label = formData.get("tag-label") as string;

        if (!label) return;

        setLoading(true);

        const newTag: Omit<Tag, "id" | "created_at"> = {
            label,
            board_id: boardId,
            bg: bgColor,
            text_color: textColor,
        };

        try {
            await createTag(newTag);
            setOpen(false);
        } catch (error) {
            console.error("Error creating tag:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ? (
                    children
                ) : (
                    <Button className="w-28.5 h-9.5">
                        <Plus />
                        Create Tag
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="border backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] bg-[rgba(53,52,54,0.6)] p-6 rounded-3xl border-solid border-[rgba(73,68,84,0.2)]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="relative">
                        <DialogTitle className="flex items-center gap-3">
                            <ModalCheckMark />
                            <p className="font-extrabold text-2xl leading-[133%] tracking-[-0.03em] text-[#e5e2e3]">
                                Create Tag
                            </p>
                        </DialogTitle>
                        <div className="absolute -top-32 -right-32 w-64 h-64 blur-[100px] bg-[rgba(208,188,255,0.25)] rounded-full pointer-events-none" />
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label
                                className="font-bold text-xs leading-[133%] tracking-widest uppercase text-[rgba(208,188,255,0.8)] mt-4"
                                htmlFor="tag-label"
                            >
                                Tag Label
                            </Label>
                            <Input
                                id="tag-label"
                                name="tag-label"
                                defaultValue="UX"
                                className="border h-12.25 px-4 py-3.5 rounded-xl border-solid border-[rgba(73,68,84,0.2)]"
                            />
                        </Field>
                        <div className="flex items-start justify-between gap-3">
                            <Label className="font-bold text-[10px] leading-[150%] tracking-widest uppercase text-[#d0bcff]">
                                Background color
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        className="w-8 h-8 rounded-sm"
                                        style={{ backgroundColor: bgColor }}
                                    />
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="center"
                                >
                                    <div className="p-3 bg-[#1a191b] border border-white/10 rounded-lg w-fit shadow-2xl">
                                        <Colorful
                                            color={bgColor}
                                            onChange={(color) =>
                                                setBgColor(color.hex)
                                            }
                                            disableAlpha={true}
                                            style={{
                                                width: "160px",
                                                height: "160px",
                                                borderRadius: "12px",
                                                gap: "12px",
                                            }}
                                        />

                                        <div className="mt-5 flex items-center gap-2 px-2 py-1.5 bg-black/40 rounded-lg border border-white/5">
                                            <div
                                                className="w-4 h-4 rounded-full border border-white/10"
                                                style={{
                                                    backgroundColor: bgColor,
                                                }}
                                            />
                                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                                                {bgColor}
                                            </span>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex items-start justify-between gap-3">
                            <Label className="font-bold text-[10px] leading-[150%] tracking-widest uppercase text-[#d0bcff]">
                                Label color
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        className="w-8 h-8 rounded-sm"
                                        style={{ backgroundColor: textColor }}
                                    />
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="center"
                                >
                                    <div className="p-3 bg-[#1a191b] border border-white/10 rounded-lg w-fit shadow-2xl">
                                        <Colorful
                                            color={textColor}
                                            onChange={(color) =>
                                                setTextColor(color.hex)
                                            }
                                            disableAlpha={true}
                                            style={{
                                                width: "160px",
                                                height: "160px",
                                                borderRadius: "12px",
                                                gap: "12px",
                                            }}
                                        />

                                        <div className="mt-5 flex items-center gap-2 px-2 py-1.5 bg-black/40 rounded-lg border border-white/5">
                                            <div
                                                className="w-4 h-4 rounded-full border border-white/10"
                                                style={{
                                                    backgroundColor: bgColor,
                                                }}
                                            />
                                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                                                {bgColor}
                                            </span>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <Field
                            className="border h-6.25 font-bold text-[10px] leading-[150%] w-fit mx-auto text-center tracking-wider uppercase pt-0.75 pb-1 px-3 rounded-full border-solid border-[rgba(208,188,255,0.2)] cursor-pointer"
                            style={{
                                backgroundColor: bgColor,
                                color: textColor,
                            }}
                        >
                            Tag example
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
