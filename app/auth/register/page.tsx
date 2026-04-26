"use client";
import { handleEmailAuth } from "@/actions/supabase/auth";
import GitHubAuth from "@/components/Auth/GitHubAuth";
import GoogleAuth from "@/components/Auth/GoogleAuth";
import { AuthLogo } from "@/components/Icons";
import { Button } from "@/components/ui/button";

import { Field, FieldLabel } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Key, User } from "lucide-react";
import { useState } from "react";

export default function Register() {
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormData) => {
        setLoading(true);
        const { email, password, confirmPassword } = {
            email: e.get("email"),
            password: e.get("password"),
            confirmPassword: e.get("confirmPassword"),
        };

        if (
            !email ||
            !password ||
            !confirmPassword ||
            password.toString().length < 6 ||
            password !== confirmPassword
        )
            return;
        await handleEmailAuth(e);
        setLoading(false);
    };

    return (
        <main className="flex flex-col items-center h-fit max-w-md px-2 sm:px-6 py-0 mx-auto mt-16">
            <AuthLogo />
            <h1 className="font-extrabold text-3xl leading-[120%] -tracking-wider text-[#e5e2e3] mt-4">
                Nocturnal Architect
            </h1>
            <p className="font-normal text-sm leading-[143%] text-[#cbc3d7]">
                Enter the collaborative void.
            </p>
            <div className="border max-w-100 h-fitbackdrop-blur-xl bg-[rgba(42,42,43,0.6)] pt-10 pb-8 px-8 rounded-2xl border-solid border-[rgba(233,221,255,0.2)] mt-8">
                <h3 className="font-bold text-xl leading-[140%] text-[#e5e2e3]">
                    Hello!
                </h3>
                <p className="font-normal text-sm leading-[143%] text-[#cbc3d7] mb-6">
                    Please enter your credentials to proceed.
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                    <GoogleAuth />
                    <GitHubAuth />
                </div>
                <div className="flex items-center justify-center gap-4 my-8">
                    <div className="w-3/10 h-px border-t-[rgba(73,68,84,0.3)] border-t border-solid" />
                    <p className="font-bold text-[10px] leading-[150%] tracking-[0.2em] uppercase text-[#958ea0]">
                        or email
                    </p>
                    <div className="w-3/10 h-px border-t-[rgba(73,68,84,0.3)] border-t border-solid" />
                </div>

                <form
                    className="flex flex-col gap-2 w-full"
                    action={handleSubmit}
                >
                    <Field className="max-w-sm w-full">
                        <FieldLabel
                            htmlFor="inline-start-input"
                            className="font-semibold text-xs leading-[133%] tracking-widest uppercase text-[#d0bcff]"
                        >
                            email address
                        </FieldLabel>
                        <InputGroup className="flex items-center justify-start border! bg-[#0e0e0f]! pr-4 py-4 rounded-[8px]! h-12! w-full! border-solid border-[rgba(73,68,84,0.2)]">
                            <InputGroupInput
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@gmail.com"
                                className="w-full!"
                            />
                            <InputGroupAddon align="inline-start">
                                <User className="text-muted-foreground" />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <Field className="max-w-sm mt-5">
                        <FieldLabel
                            htmlFor="inline-start-input"
                            className="font-semibold text-xs leading-[133%] tracking-widest uppercase text-[#d0bcff]"
                        >
                            password
                        </FieldLabel>
                        <InputGroup className="flex items-center justify-start border! bg-[#0e0e0f]! pr-4 py-4 rounded-[8px]! h-12! w-full! border-solid border-[rgba(73,68,84,0.2)]">
                            <InputGroupInput
                                id="password"
                                name="password"
                                type="password"
                                minLength={6}
                                placeholder="Enter your password"
                            />
                            <InputGroupAddon align="inline-start">
                                <Key className="text-muted-foreground" />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <Field className="max-w-sm mt-5">
                        <FieldLabel
                            htmlFor="inline-start-input"
                            className="font-semibold text-xs leading-[133%] tracking-widest uppercase text-[#d0bcff]"
                        >
                            confirm password
                        </FieldLabel>
                        <InputGroup className="flex items-center justify-start border! bg-[#0e0e0f]! pr-4 py-4 rounded-[8px]! h-12! w-full! border-solid border-[rgba(73,68,84,0.2)]">
                            <InputGroupInput
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                minLength={6}
                                placeholder="Confirm your password"
                            />
                            <InputGroupAddon align="inline-start">
                                <Key className="text-muted-foreground" />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <Button
                        disabled={loading}
                        variant="outline"
                        className="w-full h-13 shadow-[0_0_20px_0_rgba(208,188,255,0.2)] bg-[#d0bcff]! px-8 py-3 rounded-lg font-bold text-sm leading-[143%] tracking-widest uppercase text-center text-[#3c0091] hover:text-indigo-600! mt-5"
                    >
                        enter to workspace
                    </Button>
                </form>
            </div>
            <a href="/auth/login" className="flex gap-1.5 items-center mt-8">
                <p className="font-medium text-sm leading-[143%] text-center text-[#cbc3d7]">
                    Already have an architect account?
                </p>
                <p className="font-bold text-sm leading-[143%] text-center text-[#4fdbc8]">
                    Login
                </p>
            </a>
            {/* top left blick*/}
            <div className="fixed top-0 left-0 w-lg h-102.25 blur-[120px] bg-[rgba(208,188,255,0.05)] rounded-full" />
            {/* bottom right blick*/}
            <div className="fixed bottom-0 right-0 w-lg h-102.25 blur-[120px] bg-[rgba(79,219,200,0.05)] rounded-full" />
        </main>
    );
}
