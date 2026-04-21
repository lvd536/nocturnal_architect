import { fetchAllTaskTags } from "@/actions/supabase/board";
import { useBoardStore } from "@/store/boardStore";
import { TaskTag } from "@/types/board.types";
import { useEffect, useState } from "react";

export function useAllTasksTags() {
    const [tags, setTags] = useState<Record<string, TaskTag[]> | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const boardId = useBoardStore((s) => s.boardId);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);

            if (!boardId) {
                setError("Can't get board id");
                setLoading(false);
                return;
            }

            const tagsData = await fetchAllTaskTags(boardId);
            if (!tagsData) {
                setError("Error while fetch tasks tags");
                setLoading(false);
                return;
            }
            setTags(tagsData);
            setLoading(false);
        })();
    }, [boardId]);

    return { tags, loading, error };
}
