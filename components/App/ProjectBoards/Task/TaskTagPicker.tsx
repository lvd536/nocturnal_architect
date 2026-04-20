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
import { Tag, TaskTag } from "@/types/board.types";
import { useBoardTags } from "@/hooks/useBoardTags";
import { addTaskTag } from "@/actions/supabase/board";

interface Props {
    value: TaskTag[];
    onChange: (tags: TaskTag[]) => void;
    taskId: string;
}

const TaskTagPicker = ({ value, onChange, taskId }: Props) => {
    const [open, setOpen] = useState(false);
    const { tags: boardTags } = useBoardTags();
    const removeTag = (tagId: string) => {
        onChange(value.filter((t) => t.tag_id !== tagId));
    };

    const addTag = async (tag: Tag) => {
        const nextTag: TaskTag = {
            task_id: taskId,
            tag_id: tag.id,
            tags: tag,
            created_at: new Date().toISOString(),
        };

        onChange([...value, nextTag]);
        setOpen(false);

        await addTaskTag(taskId, tag.id);
    };

    return (
        <div className="flex flex-wrap items-center justify-start gap-2">
            {value &&
                value.length > 0 &&
                value.map((tag) => (
                    <p
                        key={`tag-${tag.tags?.label}`}
                        className="border h-6.25 font-bold text-[10px] leading-[150%] tracking-wider uppercase pt-0.75 pb-1 px-3 rounded-full border-solid border-[rgba(208,188,255,0.2)] cursor-pointer"
                        style={{
                            backgroundColor: tag.tags?.bg,
                            color: tag.tags?.text_color,
                        }}
                        onClick={() => {
                            removeTag(tag.tag_id);
                        }}
                    >
                        {tag.tags?.label}
                    </p>
                ))}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger>
                    <div className="flex items-center gap-1 h-6 bg-[#353436] font-bold text-[10px] text-center text-zinc-500 px-3 py-1 rounded-full cursor-pointer">
                        <Plus className="w-3 h-3" />
                        <p>Add Tag</p>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput
                            placeholder="Search tag..."
                            className="h-9"
                        />
                        <CommandList>
                            <CommandEmpty>No tag found.</CommandEmpty>
                            <CommandGroup>
                                {boardTags &&
                                    boardTags.length > 0 &&
                                    boardTags
                                        .filter(
                                            (tag) =>
                                                !value.some(
                                                    (t) => t.tag_id === tag.id,
                                                ),
                                        )
                                        .map((tag, index) => (
                                            <CommandItem
                                                key={`${tag.id}-${index}`}
                                                value={tag.label}
                                                className="border w-fit h-6.25 font-bold text-[10px] leading-[150%] tracking-wider uppercase pt-0.75 pb-1 px-3 rounded-full border-solid border-[rgba(208,188,255,0.2)] cursor-pointer mt-1.5"
                                                style={{
                                                    backgroundColor: tag.bg,
                                                    color: tag.text_color,
                                                }}
                                                onSelect={() => addTag(tag)}
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
