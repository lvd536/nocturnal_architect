import { handleUserInvite } from "@/actions/supabase/board";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ token: string }> },
) {
    const { origin } = new URL(request.url);
    const { token } = await params;

    const resp = await handleUserInvite(token);

    if ("error" in resp) {
        return NextResponse.redirect(`${origin}/`, {
            status: 500,
        });
    }

    if (resp)
        return NextResponse.redirect(`${origin}/app`, {
            status: 302,
        });

    return NextResponse.redirect(`${origin}/`, {
        status: 200,
    });
}
