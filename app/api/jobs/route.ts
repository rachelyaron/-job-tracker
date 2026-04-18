import { NextRequest, NextResponse } from "next/server";
import { getSupabaseWithToken } from "@/lib/supabase";
import { JobInsert } from "@/lib/supabase";

function getToken(req: NextRequest): string | null {
  return req.headers.get("authorization")?.replace("Bearer ", "") ?? null;
}

export async function GET(req: NextRequest) {
  try {
    const token = getToken(req);
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const sb = getSupabaseWithToken(token);
    const { data, error } = await sb
      .from("jobs")
      .select("*")
      .order("date_applied", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "שגיאה לא ידועה";
    console.error("[GET /api/jobs]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = getToken(req);
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const sb = getSupabaseWithToken(token);

    // Resolve the authenticated user so we can set user_id explicitly.
    // Never rely on DEFAULT auth.uid() from a server-side context.
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body: JobInsert = await req.json();
    const { data, error } = await sb
      .from("jobs")
      .insert({ ...body, user_id: user.id, updated_at: new Date().toISOString() })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "שגיאה לא ידועה";
    console.error("[POST /api/jobs]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
