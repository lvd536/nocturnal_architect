"use client";

import { useFormStatus } from "react-dom";
import { updateProfile } from "@/actions/supabase/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IUserProfile } from "@/types/user.types";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className="w-42 h-11 bg-[#d0bcff] text-[#340080] font-bold rounded-xl hover:shadow-[0_4px_15px_-3px_rgba(208,188,255,0.2)] transition-all"
        >
            {pending ? "Saving..." : "Save Changes"}
        </Button>
    );
}

export function SettingsForm({ profile }: { profile: IUserProfile }) {
    return (
        <form action={updateProfile} className="max-w-4xl space-y-5">
            <fieldset className="p-6 border border-white/10 bg-[rgba(53,52,54,0.6)] rounded-2xl backdrop-blur-xl">
                <legend className="px-3 text-base font-semibold text-white">
                    Personal Profile
                </legend>
                <div className="space-y-6">
                    <div className="grid gap-2">
                        <Label
                            htmlFor="displayName"
                            className="text-xs font-bold uppercase tracking-widest text-[rgba(208,188,255,0.8)]"
                        >
                            Display Name
                        </Label>
                        <Input
                            id="displayName"
                            name="displayName"
                            defaultValue={profile?.display_name}
                            className="h-12 bg-black/20 border-white/10"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label
                            htmlFor="bio"
                            className="text-xs font-bold uppercase tracking-widest text-[rgba(208,188,255,0.8)]"
                        >
                            Bio
                        </Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            defaultValue={profile?.bio}
                            className="bg-black/20 border-white/10"
                            rows={3}
                        />
                    </div>
                </div>
            </fieldset>

            <fieldset className="p-6 border border-white/10 bg-[rgba(53,52,54,0.6)] rounded-2xl backdrop-blur-xl">
                <legend className="px-3 text-base font-semibold text-white">
                    Company Profile
                </legend>
                <div className="space-y-6">
                    <div className="grid gap-2">
                        <Label
                            htmlFor="companyName"
                            className="text-xs font-bold uppercase tracking-widest text-[rgba(208,188,255,0.8)]"
                        >
                            Company Name
                        </Label>
                        <Input
                            id="companyName"
                            name="companyName"
                            defaultValue={profile?.company_name}
                            className="h-12 bg-black/20 border-white/10"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label
                            htmlFor="companyBio"
                            className="text-xs font-bold uppercase tracking-widest text-[rgba(208,188,255,0.8)]"
                        >
                            Company Bio
                        </Label>
                        <Textarea
                            id="companyBio"
                            name="companyBio"
                            defaultValue={profile?.company_bio}
                            className="bg-black/20 border-white/10"
                            rows={3}
                        />
                    </div>
                </div>
            </fieldset>

            <div className="flex justify-end pt-4">
                <SubmitButton />
            </div>
        </form>
    );
}
