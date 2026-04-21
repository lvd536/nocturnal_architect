"use client";

import { Button } from "@/components/ui/button";
import { BookType, Tag, Users } from "lucide-react";
import { InviteModal } from "../TeamHub/InviteModal";
import TaskCreationModal from "./Task/TaskCreationModal";
import TagCreationModal from "./TagCreationModal";
import { useRoleStore } from "@/store/roleStore";

export default function BoardMenu() {
    const { isEditor, isOwner } = useRoleStore();

    if (!isEditor) return null;

    return (
        <div className="flex items-center justify-between gap-2 absolute bottom-6 right-0 left-0 mx-auto w-fit min-w-50 h-15 backdrop-blur-xl shadow-[0_10px_50px_0_rgba(0,0,0,0.5)] bg-[rgba(28,27,28,0.6)] rounded-full px-2">
            <TaskCreationModal>
                <Button
                    variant="ghost"
                    className="shrink-0 rounded-full h-13 w-13"
                >
                    <BookType className="min-w-6 min-h-6" />
                </Button>
            </TaskCreationModal>
            {isOwner && (
                <InviteModal>
                    <Button
                        variant="ghost"
                        className="shrink-0 rounded-full h-13 w-13"
                    >
                        <Users className="min-w-6 min-h-6" />
                    </Button>
                </InviteModal>
            )}
            <TagCreationModal>
                <Button
                    variant="ghost"
                    className="shrink-0 rounded-full h-13 w-13"
                >
                    <Tag className="min-w-6 min-h-6" />
                </Button>
            </TagCreationModal>
        </div>
    );
}
