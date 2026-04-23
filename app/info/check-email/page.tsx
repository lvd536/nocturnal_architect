import { InfoCard } from "@/components/InfoCard";
import { MailCheck } from "lucide-react";

export default function CheckEmailPage() {
    return (
        <InfoCard
            icon={MailCheck}
            title="Check your inbox"
            description="We've sent a verification link to your email. Please click it to verify your account and continue your creative journey."
        />
    );
}
