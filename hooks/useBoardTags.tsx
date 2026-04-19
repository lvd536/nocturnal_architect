import { fetchBoardTags } from "@/actions/supabase/board";
import { useBoardStore } from "@/store/boardStore";
import { Tag } from "@/types/board.types";
import { useEffect, useState } from "react";

export function useBoardTags() {
    const [tags, setTags] = useState<Tag[] | null>(null);
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

            const tagsData = await fetchBoardTags(boardId);
            if (!tagsData) {
                setError("Error while fetch members");
                setLoading(false);
                return;
            }
            setTags(tagsData);
            setLoading(false);
        })();
    }, [boardId]);

    return { tags, loading, error };
}
