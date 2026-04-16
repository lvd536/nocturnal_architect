"use client";

import { useState } from "react";
import {
    Stepper,
    StepperContent,
    StepperIndicator,
    StepperItem,
    StepperNav,
    StepperPanel,
    StepperTrigger,
} from "@/components/reui/stepper";

import { Button } from "@/components/ui/button";
import IdentityForm from "@/components/Onboarding/IdentityForm";
import CompanyForm from "@/components/Onboarding/CompanyForm";
import FinishForm from "@/components/Onboarding/FinishForm";
import { IOnboardingForm } from "@/types/form.types";

const steps = [
    {
        title: "Build Your Identity",
        description: "Define how you appear in the digital studio.",
        Form: IdentityForm,
    },
    {
        title: "Create your company",
        description: "Define name of your company",
        Form: CompanyForm,
    },
    {
        title: "Finish setup",
        description: "You have successfully setup your data!",
        Form: FinishForm,
    },
];

export default function Onboarding() {
    const [formData, setFormData] = useState<IOnboardingForm>({
        displayName: "",
        bio: "",
        companyName: "",
        companyBio: "",
    });
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <Stepper
            value={currentStep}
            onValueChange={setCurrentStep}
            className="space-y-8 mx-auto mt-10 border w-2xl h-fit max-w-2xl backdrop-blur-xl shadow-[0_0_80px_0_rgba(208,188,255,0.08)] rounded-xl border-solid border-[rgba(73,68,84,0.2)] bg-[rgba(42,42,43,0.6)] pt-8 pb-4 px-8"
        >
            <StepperNav className="gap-3">
                <div className="w-full">
                    <div className="w-full flex items-center justify-between">
                        <h1 className="font-black text-xl leading-[140%] tracking-widest uppercase text-[#d0bcff]">
                            NOCTURNAL ARCHITECT
                        </h1>
                        <div className="flex gap-2 uppercase">
                            <p className="font-normal text-xs leading-[133%] tracking-widest text-[#958ea0]">
                                Onboarding
                            </p>
                            <p className="font-bold text-xs leading-[133%] tracking-widest uppercase text-[#d0bcff]">
                                step {currentStep}/{steps.length}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-8">
                        {steps.map((_, index) => (
                            <StepperItem
                                key={index}
                                step={index + 1}
                                className="relative flex-1 items-start"
                            >
                                <StepperTrigger
                                    className="flex grow flex-col items-start justify-center gap-2.5"
                                    asChild
                                >
                                    <StepperIndicator className="bg-border data-[state=active]:bg-[#d0bcff] data-[state=active]:shadow-[0_0_15px_0_rgba(208,188,255,0.3)] data-[state=completed]:bg-primary h-1 w-full rounded-full">
                                        <span className="sr-only">
                                            {index + 1}
                                        </span>
                                    </StepperIndicator>
                                </StepperTrigger>
                            </StepperItem>
                        ))}
                    </div>
                </div>
            </StepperNav>

            <StepperPanel className="text-sm">
                {steps.map((step, index) => (
                    <StepperContent
                        key={index}
                        value={index + 1}
                        className="flex flex-col items-center justify-center"
                    >
                        <p className="font-bold text-3xl leading-[120%] tracking-[-0.03em] text-center text-[#d0bcff]">
                            {step.title}
                        </p>
                        <p className="font-normal text-base leading-[150%] text-center text-[#cbc3d7] mt-2">
                            {step.description}
                        </p>
                        <step.Form
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </StepperContent>
                ))}
            </StepperPanel>

            <div className="flex items-center justify-between gap-2.5">
                <Button
                    variant="ghost"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    disabled={currentStep === 1}
                    className="font-normal text-xs leading-[133%] tracking-widest uppercase text-center text-[#958ea0]"
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    disabled={currentStep === steps.length}
                    className="w-37.5 h-11 shadow-[0_0_20px_0_rgba(208,188,255,0.2)] bg-[#d0bcff]! px-8 py-3 rounded-lg font-bold text-sm leading-[143%] tracking-widest uppercase text-center text-[#3c0091] hover:text-indigo-600!"
                >
                    Next step
                </Button>
            </div>
        </Stepper>
    );
}
