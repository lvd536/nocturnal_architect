"use server";

import { IOnboardingForm } from "@/types/form.types";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function handleEmailAuth(formData: FormData) {
    const supabase = await createClient();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (signInError && signInError.message === "Invalid login credentials") {
        const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) return redirect("/error");
        return redirect("/info/check-email");
    }

    if (signInError) return redirect("/info/error");

    return redirect("/onboarding");
}

export async function signInWithOAuth(provider: "google" | "github") {
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${origin}/auth/callback?next=/onboarding`,
        },
    });

    if (error) {
        console.error(error);
        redirect("/error");
    }

    if (data?.url) {
        redirect(data.url);
    }

    redirect("/error");
}

export async function onBoardUser(form: IOnboardingForm) {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return redirect("/auth/login");
    }

    const { error } = await supabase
        .from("profiles")
        .update({
            display_name: form.displayName,
            bio: form.bio,
            company_name: form.companyName,
            company_bio: form.companyBio,
        })
        .eq("id", user.id);

    if (error) {
        console.error(error);
        return redirect("/error");
    }

    redirect("/app");
}
