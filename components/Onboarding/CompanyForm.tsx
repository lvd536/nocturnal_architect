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

export default function CompanyForm({ formData, setFormData }: IProps) {
    return (
        <form className="w-full">
            <div className="flex flex-col gap-2 w-full">
                <Field className="max-w-sm w-full">
                    <FieldLabel
                        htmlFor="companyName"
                        className="font-semibold text-xs leading-[133%] tracking-widest uppercase text-[#d0bcff]"
                    >
                        company name
                    </FieldLabel>
                    <InputGroup className="flex items-center justify-start border! bg-[#0e0e0f]! pr-4 py-4 rounded-[8px]! h-12! w-full! md:w-9/10! border-solid border-[rgba(73,68,84,0.2)]">
                        <InputGroupInput
                            id="companyName"
                            type="text"
                            placeholder="Microsoft"
                            className="w-full!"
                            required
                            value={formData.companyName}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    companyName: e.target.value,
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
                        htmlFor="companyBio"
                        className="font-semibold text-xs leading-[133%] tracking-widest uppercase text-[#d0bcff]"
                    >
                        company bio
                    </FieldLabel>
                    <InputGroup className="flex items-center justify-start border! bg-[#0e0e0f]! pr-4 py-4 rounded-[8px]! h-12! w-full! md:w-9/10! border-solid border-[rgba(73,68,84,0.2)]">
                        <InputGroupInput
                            id="companyBio"
                            type="text"
                            placeholder="we dont support LGBTQ+"
                            value={formData.companyBio}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    companyBio: e.target.value,
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
