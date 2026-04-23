import { InfoCard } from "@/components/InfoCard";
import { AlertCircle } from "lucide-react";

export default function ErrorPage() {
    return (
        <InfoCard
            icon={AlertCircle}
            title="Something went wrong"
            description="An unexpected error occurred. Please try again later or contact our support team if the problem persists."
        />
    );
}
