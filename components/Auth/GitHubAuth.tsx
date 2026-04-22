import { signInWithOAuth } from "@/actions/supabase/auth";
import { Button } from "../ui/button";
import { GitHubLogo } from "../Icons";

export default function GitHubAuth() {
    return (
        <Button
            onClick={() => signInWithOAuth("github")}
            className="border w-full sm:w-38.5 h-10.5 backdrop-blur-xl bg-[rgba(42,42,43,0.6)] px-8.25 py-2.5 rounded-xl border-solid border-[rgba(233,221,255,0.2)] font-semibold text-xs leading-[133%] tracking-wider uppercase text-center text-[#e5e2e3]"
        >
            <GitHubLogo />
            GitHub
        </Button>
    );
}
