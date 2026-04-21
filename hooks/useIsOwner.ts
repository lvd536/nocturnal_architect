import { checkIsOwner } from "@/actions/supabase/board";
import { useEffect, useState } from "react";

export function useIsOwner(boardId: string | null) {
    const [isOwner, serOwner] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);

            if (!boardId) {
                setError("Can't get board id");
                setLoading(false);
                return;
            }

            const isOwner = await checkIsOwner(boardId);
            if (!isOwner || typeof isOwner !== "boolean") {
                if (typeof isOwner === "object") {
                    setError(isOwner.error.message);
                } else setError("Error while editor check");
                setLoading(false);
                return;
            }
            serOwner(isOwner);
            setLoading(false);
        })();
    }, [boardId]);

    return { isOwner, loading, error };
}
