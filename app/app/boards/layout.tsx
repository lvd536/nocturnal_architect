"use client";
import { useIsEditor } from "@/hooks/useIsEditor";
import { useIsOwner } from "@/hooks/useIsOwner";
import { useBoardStore } from "@/store/boardStore";
import { useRoleStore } from "@/store/roleStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function BoardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const boardId = useBoardStore((s) => s.boardId);
    const params = useParams();
    const { isEditor } = useIsEditor(
        params.id ? (params.id as string) : boardId || null,
    );
    const { isOwner } = useIsOwner(
        params.id ? (params.id as string) : boardId || null,
    );

    const { setOwner, setEditor } = useRoleStore(
        useShallow((s) => ({
            setEditor: s.setEditor,
            setOwner: s.setOwner,
        })),
    );

    useEffect(() => {
        setEditor(isEditor);
        setOwner(isOwner);
    }, [isEditor, isOwner, setEditor, setOwner]);

    return <>{children}</>;
}
