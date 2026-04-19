"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { createBoard } from "@/actions/supabase/board";

export default function CreateBoard() {
    const handleSubmit = async (e: FormData) => {
        const { title, description } = {
            title: e.get("board-name") || "",
            description: e.get("board-description") || "",
        };
        
        await createBoard(title.toString(), description.toString());
    };

    return (
        <Dialog>
            <DialogTrigger>
                <div className="w-46.5 h-53 backdrop-blur-xl bg-[rgba(53,52,54,0.4)] p-6 rounded-xl border-2 border-dashed border-[rgba(73,68,84,0.3)]">
                    <CirclePlus className="w-12 h-12 stroke-[#d0bcff] bg-[rgba(208,188,255,0.1)] rounded-full p-3 mx-auto" />
                    <p className="font-bold text-lg leading-[156%] text-center text-[#e5e2e3] mt-4 mb-2">
                        Create New Board
                    </p>
                    <p className="font-normal text-xs leading-[133%] text-center text-slate-500">
                        Start a new creative journey
                    </p>
                </div>
            </DialogTrigger>
            <DialogContent className="border backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] bg-[rgba(53,52,54,0.6)] p-6 rounded-3xl border-solid border-[rgba(73,68,84,0.2)]">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                            <div className="rounded-full h-8 w-2 bg-[#d0bcff]" />
                            <p className="font-extrabold text-3xl leading-[120%] tracking-[-0.03em] text-[#e5e2e3]">
                                Create New Board
                            </p>
                        </DialogTitle>
                        <DialogDescription className="font-normal text-sm leading-[143%] text-[#cbc3d7]">
                            Design a workspace for deep focus and architectural
                            precision. Set your environment below.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label
                                className="font-bold text-xs leading-[133%] tracking-widest uppercase text-[rgba(208,188,255,0.8)]"
                                htmlFor="board-name"
                            >
                                Board Name
                            </Label>
                            <Input
                                id="board-name"
                                name="board-name"
                                defaultValue="Cyberpunk design"
                                className="border h-12.25 px-4 py-3.5 rounded-xl border-solid border-[rgba(73,68,84,0.2)]"
                            />
                        </Field>
                        <Field>
                            <FieldLabel
                                className="font-bold text-xs leading-[133%] tracking-widest uppercase text-[rgba(208,188,255,0.8)]"
                                htmlFor="board-description"
                            >
                                Description (optional)
                            </FieldLabel>
                            <Textarea
                                id="board-description"
                                name="board-description"
                                placeholder="Type board description."
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="items-center">
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
