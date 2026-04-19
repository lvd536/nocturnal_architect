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

export default function TagCreationModal({
    children,
}: React.PropsWithChildren) {
    const [bgColor, setBgColor] = useState("#fff");
    const [textColor, setTextColor] = useState("#000");
    const boardId = useBoardStore((s) => s.boardId);

    const handleSubmit = async (e: FormData) => {
        const label = e.get("tag-label");
        if (!boardId || !label) return;

        const newTag: Omit<Tag, "id" | "created_at"> = {
            label: String(label),
            board_id: boardId,
            bg: bgColor,
            text_color: textColor,
        };

        await createTag(newTag);
    };

    return (
        <Dialog>
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
                <form action={handleSubmit}>
                    <DialogHeader className="relative">
                        <DialogTitle className="flex items-center gap-3">
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
