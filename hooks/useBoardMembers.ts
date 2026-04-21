import { fetchBoardMembers } from "@/actions/supabase/board";
import { useBoardStore } from "@/store/boardStore";
import { BoardMember } from "@/types/board.types";
import { useEffect, useState } from "react";

export function useBoardMembers() {
    const [members, setMembers] = useState<BoardMember[] | null>(null);
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
            const membersData = await fetchBoardMembers(boardId);
            if (!membersData) {
                setError("Error while fetch board members");
                setLoading(false);
                return;
            }
            setMembers(membersData);
            setLoading(false);
        })();
    }, [boardId]);

    return { members, loading, error };
}
