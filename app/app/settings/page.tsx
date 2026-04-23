import { createClient } from "@/utils/supabase/server";
import { SettingsForm } from "@/components/App/Settings/SettingsForm";
import { IUserProfile } from "@/types/user.types";

export default async function SettingsPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

    return (
        <main className="flex-1 w-full p-6 lg:p-12">
            <header className="mb-10">
                <h1 className="text-4xl font-extrabold text-[#e5e2e3] tracking-tighter">
                    Account Settings
                </h1>
                <p className="mt-2 text-slate-400 max-w-2xl">
                    Update your profile and company information. Changes will be
                    reflected across the platform.
                </p>
            </header>

            <SettingsForm profile={profile as IUserProfile} />
        </main>
    );
}
