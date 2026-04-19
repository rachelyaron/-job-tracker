"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

const DEMO_EMAIL    = "demo@example.com";
const DEMO_PASSWORD = "demo1234";

export default function AuthForm() {
  const [mode, setMode]         = useState<"login" | "signup">("login");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError]       = useState("");
  const [message, setMessage]   = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const sb = getSupabase();
    try {
      if (mode === "login") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await sb.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("נשלח אליך אימייל אישור. אשר את הכתובת ואז התחבר.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "שגיאה לא ידועה";
      if (msg.includes("Invalid login credentials")) setError("אימייל או סיסמה שגויים");
      else if (msg.includes("Email not confirmed"))  setError("יש לאשר את האימייל תחילה");
      else if (msg.includes("User already registered")) setError("כתובת האימייל כבר רשומה");
      else if (msg.includes("Password should be at least")) setError("הסיסמה חייבת להכיל לפחות 6 תווים");
      else setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async () => {
    setDemoLoading(true);
    setError("");
    setMessage("");
    const sb = getSupabase();
    try {
      // Attempt login
      let { error: signInErr } = await sb.auth.signInWithPassword({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
      });

      // If account doesn't exist yet, create it and retry
      if (signInErr?.message.includes("Invalid login credentials")) {
        const { error: signUpErr } = await sb.auth.signUp({
          email: DEMO_EMAIL,
          password: DEMO_PASSWORD,
        });
        if (signUpErr && !signUpErr.message.includes("already registered")) throw signUpErr;

        const { error: retryErr } = await sb.auth.signInWithPassword({
          email: DEMO_EMAIL,
          password: DEMO_PASSWORD,
        });
        if (retryErr) throw retryErr;
        signInErr = null;
      } else if (signInErr) {
        throw signInErr;
      }

      // Seed demo data (idempotent — skips if already seeded)
      const { data: { session } } = await sb.auth.getSession();
      if (session?.access_token) {
        await fetch("/api/demo/seed", {
          method: "POST",
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
      }
      // Auth state change fires in page.tsx → fetchJobs() runs automatically
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "שגיאה לא ידועה";
      if (msg.includes("Email not confirmed")) {
        setError("יש לאשר את האימייל של חשבון הדמו. אנא פנה למנהל.");
      } else {
        setError(msg);
      }
      setDemoLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">📋</div>
        <h1 className="auth-title">מעקב מועמדויות</h1>
        <p className="auth-sub">נהל את חיפוש העבודה שלך</p>

        {/* Demo banner */}
        <button
          type="button"
          onClick={handleDemo}
          disabled={demoLoading}
          className="demo-btn"
        >
          {demoLoading ? (
            <>
              <span className="demo-spinner" />
              טוען דמו…
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M5 3l14 9-14 9V3z" fill="currentColor"/>
              </svg>
              נסה את האפליקציה — כניסת דמו
            </>
          )}
        </button>

        <div className="auth-divider"><span>או התחבר עם חשבון</span></div>

        <div className="segmented" style={{ margin: "0 0 20px" }}>
          <button
            type="button"
            onClick={() => { setMode("login"); setError(""); setMessage(""); }}
            className={mode === "login" ? "active" : ""}
          >
            התחברות
          </button>
          <button
            type="button"
            onClick={() => { setMode("signup"); setError(""); setMessage(""); }}
            className={mode === "signup" ? "active" : ""}
          >
            הרשמה
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {error && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca",
              color: "#b91c1c", borderRadius: 10, padding: "10px 14px", fontSize: 13,
            }}>
              {error}
            </div>
          )}
          {message && (
            <div style={{
              background: "#f0fdf4", border: "1px solid #bbf7d0",
              color: "#166534", borderRadius: 10, padding: "10px 14px", fontSize: 13,
            }}>
              {message}
            </div>
          )}

          <div className="field">
            <label>אימייל</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              required placeholder="you@example.com"
              className="input" dir="ltr" autoComplete="email"
            />
          </div>

          <div className="field">
            <label>סיסמה</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required placeholder="לפחות 6 תווים"
              className="input" dir="ltr"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: 4, justifyContent: "center" }}>
            {loading ? "..." : mode === "login" ? "התחבר" : "הירשם"}
          </button>
        </form>
      </div>
    </div>
  );
}
