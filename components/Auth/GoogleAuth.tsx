import { signInWithOAuth } from "@/actions/supabase/auth";
import { Button } from "../ui/button";

export default function GoogleAuth() {
    return (
        <Button
            onClick={() => signInWithOAuth("google")}
            className="border w-38.5 h-10.5 backdrop-blur-xl bg-[rgba(42,42,43,0.6)] px-8.25 py-2.5 rounded-xl border-solid border-[rgba(233,221,255,0.2)] font-semibold text-xs leading-[133%] tracking-wider uppercase text-center text-[#e5e2e3]"
        >
            Google
        </Button>
    );
}
