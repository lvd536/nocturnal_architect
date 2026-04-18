import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "./utils/supabase/server";

export async function proxy(request: NextRequest) {
    const supabase = await createClient();
    const url = new URL(request.url);
    const pathname = url.pathname;

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (!user.confirmed_at) {
        return NextResponse.redirect(new URL("/info/check-email", request.url));
    }

    const { data: userData } = await supabase
        .from("profiles")
        .select("id, display_name")
        .eq("id", user.id)
        .maybeSingle();

    if (!userData) {
        if (pathname === "/onboarding") return NextResponse.next();
        return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    if (userData.display_name && pathname === "/onboarding") {
        return NextResponse.redirect(new URL("/app", request.url));
    }

    if (!userData.display_name && pathname !== "/onboarding") {
        return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/app/:path*", "/onboarding"],
};
