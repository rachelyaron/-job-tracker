import { NextRequest, NextResponse } from "next/server";
import { getSupabaseWithToken } from "@/lib/supabase";

const DEMO_EMAIL = "demo@example.com";

// Helper: date string N days ago from a reference date
function daysAgo(n: number, from = "2026-04-20"): string {
  const d = new Date(from);
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}
function daysAgoISO(n: number, from = "2026-04-20"): string {
  const d = new Date(from);
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

const DEMO_JOBS = [
  {
    company_name: "Google",
    role: "Senior Frontend Engineer",
    field: "טכנולוגיה",
    date_applied: daysAgo(21),
    stages: [
      { name: "הגשתי מועמדות", state: "completed" },
      { name: "שיחת טלפון",    state: "completed" },
      { name: "ראיון HR",       state: "completed" },
      { name: "ראיון טכני",    state: "completed" },
      { name: "ראיון סופי",    state: "not_reached" },
      { name: "הצעה",           state: "not_reached" },
    ],
    job_link: null,
    cv_url: null,
    notes: "ראיון סופי עם מנהל הצוות — מרגיש טוב!",
    updated_at: daysAgoISO(2),
  },
  {
    company_name: "Meta",
    role: "Product Manager",
    field: "ניהול מוצר",
    date_applied: daysAgo(14),
    stages: [
      { name: "הגשתי מועמדות", state: "completed" },
      { name: "שיחת טלפון",    state: "completed" },
      { name: "ראיון HR",       state: "completed" },
      { name: "ראיון טכני",    state: "not_reached" },
      { name: "ראיון סופי",    state: "not_reached" },
      { name: "הצעה",           state: "not_reached" },
    ],
    job_link: null,
    cv_url: null,
    notes: "אמרו שהתהליך לוקח 3-4 שבועות מרגע ה-HR",
    updated_at: daysAgoISO(4),
  },
  {
    company_name: "Wix",
    role: "Full Stack Developer",
    field: "טכנולוגיה",
    date_applied: daysAgo(7),
    stages: [
      { name: "הגשתי מועמדות", state: "completed" },
      { name: "שיחת טלפון",    state: "not_reached" },
      { name: "ראיון HR",       state: "not_reached" },
      { name: "ראיון טכני",    state: "not_reached" },
      { name: "ראיון סופי",    state: "not_reached" },
      { name: "הצעה",           state: "not_reached" },
    ],
    job_link: null,
    cv_url: null,
    notes: "נשלח קו״ח דרך LinkedIn — ממתין לתשובה",
    updated_at: daysAgoISO(7), // stale: not updated since application
  },
  {
    company_name: "Lemonade",
    role: "Data Analyst",
    field: "נתונים ו-AI",
    date_applied: daysAgo(35),
    stages: [
      { name: "הגשתי מועמדות", state: "completed" },
      { name: "שיחת טלפון",    state: "completed" },
      { name: "ראיון HR",       state: "completed" },
      { name: "ראיון טכני",    state: "failed" },
      { name: "ראיון סופי",    state: "not_reached" },
      { name: "הצעה",           state: "not_reached" },
    ],
    job_link: null,
    cv_url: null,
    notes: "נפסלתי אחרי case study — אתחכם לפעם הבאה",
    updated_at: daysAgoISO(25),
  },
  {
    company_name: "Taboola",
    role: "Backend Engineer",
    field: "טכנולוגיה",
    date_applied: daysAgo(42),
    stages: [
      { name: "הגשתי מועמדות", state: "completed" },
      { name: "שיחת טלפון",    state: "completed" },
      { name: "ראיון HR",       state: "completed" },
      { name: "ראיון טכני",    state: "completed" },
      { name: "ראיון סופי",    state: "completed" },
      { name: "הצעה",           state: "completed" },
    ],
    job_link: null,
    cv_url: null,
    notes: "קיבלתי הצעה! 340K ₪ + אופציות 🎉",
    updated_at: daysAgoISO(5),
  },
];

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "") ?? "";
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const sb = getSupabaseWithToken(token);
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Only seed the demo account
    if (user.email !== DEMO_EMAIL) {
      return NextResponse.json({ error: "Not a demo account" }, { status: 403 });
    }

    // Check if already has data — idempotent
    const { data: existing } = await sb.from("jobs").select("id").limit(1);
    if (existing && existing.length > 0) {
      return NextResponse.json({ seeded: false, message: "Already has data" });
    }

    const rows = DEMO_JOBS.map(j => ({ ...j, user_id: user.id }));
    const { data, error } = await sb.from("jobs").insert(rows).select();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ seeded: true, count: data?.length ?? 0 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[POST /api/demo/seed]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
