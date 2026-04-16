"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { TaskTag } from "@/types/board.types";
import { TASK_TAGS } from "@/consts/todo.consts";

const TaskTagPicker = () => {
    const [open, setOpen] = useState(false);
    const [tags, setTags] = useState<TaskTag[]>([]);

    return (
        <div className="flex flex-wrap items-center justify-start gap-2">
            {tags.map((tag) => (
                <p
                    className={`border h-6.25 font-bold text-[10px] leading-[150%] tracking-wider uppercase pt-0.75 pb-1 px-3 rounded-full border-solid border-[rgba(208,188,255,0.2)] cursor-pointer`}
                    style={{
                        backgroundColor: tag.bg,
                        color: tag.text,
                    }}
                    onClick={() =>
                        setTags(
                            tags.filter(
                                (pervTag) => pervTag.label !== tag.label,
                            ),
                        )
                    }
                    key={`tag-${tag.label}`}
                >
                    {tag.label}
                </p>
            ))}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger>
                    <div className="flex items-center gap-1 h-6 bg-[#353436] font-bold text-[10px] leading-[150%] text-center text-zinc-500 px-3 py-1 rounded-full">
                        <Plus className="w-3 h-3" />
                        <p>Add Tag</p>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                        />
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {TASK_TAGS.filter(
                                    (tag) =>
                                        !tags.some(
                                            (t) => t.label === tag.label,
                                        ),
                                ).map((tag) => (
                                    <CommandItem
                                        key={tag.label}
                                        value={tag.label}
                                        onSelect={() => {
                                            setTags((perv) => [...perv, tag]);
                                            setOpen(false);
                                        }}
                                    >
                                        {tag.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default TaskTagPicker;
