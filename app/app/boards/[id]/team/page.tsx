import { InviteModal } from "@/components/App/TeamHub/InviteModal";
import TeamMembersList from "@/components/App/TeamHub/TeamMembersList";

export default async function TeamPage() {
    return (
        <div className="px-12">
            <h1 className="font-extrabold text-5xl leading-[100%] tracking-[-0.03em] text-[#e5e2e3]">
                Team Hub
            </h1>
            <p className="font-normal text-base leading-[150%] text-zinc-500 max-w-110 mt-2 mb-10">
                Orchestrate your creative force. Manage members, define
                architectural roles, and monitor collective pulse.
            </p>
            <TeamMembersList />
            <InviteModal />
        </div>
    );
}
