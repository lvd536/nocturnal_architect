"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const profileUpdate = {
        display_name: formData.get("displayName") as string,
        bio: formData.get("bio") as string,
        company_name: formData.get("companyName") as string,
        company_bio: formData.get("companyBio") as string,
    };

    const { error } = await supabase
        .from("profiles")
        .update(profileUpdate)
        .eq("id", user.id);

    if (error) {
        console.error("Error updating profile:", error);
        throw error;
    }

    revalidatePath("/app/settings");
}
