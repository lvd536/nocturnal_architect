import { IOnboardingForm } from "@/types/form.types";
import { Field, FieldLabel } from "../ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "../ui/input-group";
import { BookUser, User } from "lucide-react";

interface IProps {
    formData: IOnboardingForm;
    setFormData: React.Dispatch<React.SetStateAction<IOnboardingForm>>;
}

export default function IdentityForm({ formData, setFormData }: IProps) {
    return (
        <form className="w-full">
            <div className="flex flex-col gap-2 w-full">
                <Field className="max-w-sm w-full">
                    <FieldLabel
                        htmlFor="displayName"
                        className="font-semibold text-xs leading-[133%] tracking-widest uppercase text-[#d0bcff]"
                    >
                        display name
                    </FieldLabel>
                    <InputGroup className="flex items-center justify-start border! bg-[#0e0e0f]! pr-4 py-4 rounded-[8px]! h-12! w-full! md:w-9/10! border-solid border-[rgba(73,68,84,0.2)]">
                        <InputGroupInput
                            id="displayName"
                            type="text"
                            placeholder="John Doe"
                            className="w-full!"
                            required
                            value={formData.displayName}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    displayName: e.target.value,
                                }))
                            }
                        />
                        <InputGroupAddon align="inline-start">
                            <User className="text-muted-foreground" />
                        </InputGroupAddon>
                    </InputGroup>
                </Field>
                <Field className="max-w-sm">
                    <FieldLabel
                        htmlFor="bio"
                        className="font-semibold text-xs leading-[133%] tracking-widest uppercase text-[#d0bcff]"
                    >
                        bio
                    </FieldLabel>
                    <InputGroup className="flex items-center justify-start border! bg-[#0e0e0f]! pr-4 py-4 rounded-[8px]! h-12! w-full! md:w-9/10! border-solid border-[rgba(73,68,84,0.2)]">
                        <InputGroupInput
                            id="bio"
                            type="text"
                            placeholder="hello world"
                            value={formData.bio}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    bio: e.target.value,
                                }))
                            }
                        />
                        <InputGroupAddon align="inline-start">
                            <BookUser className="text-muted-foreground" />
                        </InputGroupAddon>
                    </InputGroup>
                </Field>
            </div>
        </form>
    );
}
