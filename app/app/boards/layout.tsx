"use client";
import { LoadingScreen } from "@/components/LoadingScreen";
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
    const { boardId, isLoading } = useBoardStore(
        useShallow((s) => ({
            boardId: s.boardId,
            isLoading: s.isLoading,
        })),
    );
    const params = useParams();
    const id = params.id ? (params.id as string) : boardId || null;

    const { isEditor, loading: editorLoading } = useIsEditor(id);
    const { isOwner, loading: ownerLoading } = useIsOwner(id);
    const loading = isLoading || editorLoading || ownerLoading;

    const { setOwner, setEditor } = useRoleStore(
        useShallow((s) => ({
            setEditor: s.setEditor,
            setOwner: s.setOwner,
        })),
    );

    useEffect(() => {
        setEditor(!!isEditor);
        setOwner(!!isOwner);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditor, isOwner]);

    return (
        <>
            {loading && <LoadingScreen />} {children}
        </>
    );
}
