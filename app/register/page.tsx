"use client";
import { Button } from "@/components/ui/button";

import { Field, FieldLabel } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Key, User } from "lucide-react";

export default function Register() {
    return (
        <main className="flex flex-col items-center w-md h-fit max-w-md px-6 py-0 mx-auto mt-36">
            <svg
                width="41"
                height="51"
                viewBox="0 0 41 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    width="40.5"
                    height="51"
                    rx="12"
                    fill="#D0BCFF"
                    fillOpacity="0.1"
                />
                <path
                    d="M12.375 39L12 35.7L16.275 23.925C16.65 24.275 17.0563 24.5687 17.4938 24.8062C17.9313 25.0437 18.4 25.225 18.9 25.35L14.775 36.675L12.375 39ZM28.125 39L25.725 36.675L21.6 25.35C22.1 25.225 22.5688 25.0437 23.0063 24.8062C23.4438 24.5687 23.85 24.275 24.225 23.925L28.5 35.7L28.125 39ZM20.25 24C19 24 17.9375 23.5625 17.0625 22.6875C16.1875 21.8125 15.75 20.75 15.75 19.5C15.75 18.525 16.0312 17.6562 16.5938 16.8938C17.1562 16.1313 17.875 15.6 18.75 15.3V12H21.75V15.3C22.625 15.6 23.3438 16.1313 23.9062 16.8938C24.4688 17.6562 24.75 18.525 24.75 19.5C24.75 20.75 24.3125 21.8125 23.4375 22.6875C22.5625 23.5625 21.5 24 20.25 24ZM20.25 21C20.675 21 21.0312 20.8563 21.3188 20.5688C21.6063 20.2812 21.75 19.925 21.75 19.5C21.75 19.075 21.6063 18.7188 21.3188 18.4313C21.0312 18.1438 20.675 18 20.25 18C19.825 18 19.4688 18.1438 19.1813 18.4313C18.8938 18.7188 18.75 19.075 18.75 19.5C18.75 19.925 18.8938 20.2812 19.1813 20.5688C19.4688 20.8563 19.825 21 20.25 21Z"
                    fill="#D0BCFF"
                />
            </svg>
            <h1 className="font-extrabold text-3xl leading-[120%] -tracking-wider text-[#e5e2e3] mt-4">
                Nocturnal Architect
            </h1>
            <p className="font-normal text-sm leading-[143%] text-[#cbc3d7]">
                Enter the collaborative void.
            </p>
            <div className="border w-100 h-fitbackdrop-blur-xl bg-[rgba(42,42,43,0.6)] pt-10 pb-8 px-8 rounded-2xl border-solid border-[rgba(233,221,255,0.2)] mt-8">
                <h3 className="font-bold text-xl leading-[140%] text-[#e5e2e3]">
                    Hello!
                </h3>
                <p className="font-normal text-sm leading-[143%] text-[#cbc3d7] mb-6">
                    Please enter your credentials to proceed.
                </p>
                <div className="grid grid-cols-2">
                    <Button className="border w-38.5 h-10.5 backdrop-blur-xl bg-[rgba(42,42,43,0.6)] px-8.25 py-2.5 rounded-xl border-solid border-[rgba(233,221,255,0.2)] font-semibold text-xs leading-[133%] tracking-wider uppercase text-center text-[#e5e2e3]">
                        Google
                    </Button>
                    <Button className="border w-38.5 h-10.5 backdrop-blur-xl bg-[rgba(42,42,43,0.6)] px-8.25 py-2.5 rounded-xl border-solid border-[rgba(233,221,255,0.2)] font-semibold text-xs leading-[133%] tracking-wider uppercase text-center text-[#e5e2e3]">
                        GitHub
                    </Button>
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
                    action={(e) => console.log(e)}
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
                                type="confirmPassword"
                                placeholder="Confirm your password"
                            />
                            <InputGroupAddon align="inline-start">
                                <Key className="text-muted-foreground" />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <Button
                        variant="outline"
                        className="w-full h-13 shadow-[0_0_20px_0_rgba(208,188,255,0.2)] bg-[#d0bcff]! px-8 py-3 rounded-lg font-bold text-sm leading-[143%] tracking-widest uppercase text-center text-[#3c0091] hover:text-indigo-600! mt-5"
                    >
                        enter to workspace
                    </Button>
                </form>
            </div>
            <a href="/login" className="flex gap-1.5 items-center mt-8">
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
