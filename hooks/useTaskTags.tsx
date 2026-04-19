import { fetchTaskTags } from "@/actions/supabase/board";
import { TaskTag } from "@/types/board.types";
import { useEffect, useState } from "react";

export function useTaskTags(taskId: string) {
    const [tags, setTags] = useState<TaskTag[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);
            const tagsData = await fetchTaskTags(taskId);
            if (!tagsData) {
                setError("Error while fetch members");
                setLoading(false);
                return;
            }
            setTags(tagsData);
            setLoading(false);
        })();
    }, [taskId]);

    return { tags, loading, error };
}
