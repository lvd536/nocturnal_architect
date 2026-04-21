import { checkIsEditor } from "@/actions/supabase/board";
import { useEffect, useState } from "react";

export function useIsEditor(boardId: string | null) {
    const [isEditor, setEditor] = useState<boolean>(false);
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

            const isEditor = await checkIsEditor(boardId);
            if (!isEditor || typeof isEditor !== "boolean") {
                if (typeof isEditor === "object") {
                    setError(isEditor.error.message);
                } else setError("Error while editor check");
                setLoading(false);
                return;
            }
            setEditor(isEditor);
            setLoading(false);
        })();
    }, [boardId]);

    return { isEditor, loading, error };
}
