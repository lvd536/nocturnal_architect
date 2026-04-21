import { Check, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRoleStore } from "@/store/roleStore";

interface Props {
    isDone: boolean;
    onDelete: () => void;
    onEdit: () => void;
    onToggleDone: () => void;
}

export function TaskDropdownMenu({
    isDone,
    onDelete,
    onEdit,
    onToggleDone,
}: Props) {
    const { isEditor } = useRoleStore();
    
    if (!isEditor) return null
    
    return (
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
                    <DropdownMenuItem onClick={onDelete}>
                        <Trash2 /> Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onEdit}>
                        <Pencil /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onToggleDone}>
                        <Check /> {isDone ? "Undone" : "Done"}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
