"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

export default function useRemoteUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const {
                    data: { user },
                    error,
                } = await supabase.auth.getUser();

                setUser(user);
                if (error) throw error;
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        })();
    }, [supabase.auth]);

    return { user, loading, error };
}
