"use client";

import { useState } from "react";
import { Job, getSupabase } from "@/lib/supabase";

interface AiTipsProps { jobs: Job[]; }

export default function AiTips({ jobs }: AiTipsProps) {
  const [tips, setTips]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");
  const [open, setOpen]     = useState(false);

  const fetchTips = async () => {
    setLoading(true);
    setError("");
    setTips("");
    setOpen(true);
    try {
      const { data: { session } } = await getSupabase().auth.getSession();
      const token = session?.access_token ?? "";
      const res = await fetch("/api/ai-tips", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ jobs }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "שגיאה בקבלת עצות");
      }
      const data = await res.json();
      setTips(data.tips);
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה לא ידועה");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={fetchTips}
        disabled={loading || jobs.length === 0}
        className="btn btn-ai"
        title={jobs.length === 0 ? "הוסף מועמדויות תחילה" : ""}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {loading ? "מנתח..." : "טיפים מ-AI"}
      </button>

      {open && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="modal lg" style={{ maxHeight: "85vh" }}>
            <div className="ai-header">
              <div className="ai-title">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                המלצות AI לשיפור החיפוש
              </div>
              <div className="ai-sub">ניתוח מועמדויות וטיפים מעשיים</div>
            </div>

            <div className="modal-body">
              {loading && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 0", gap: 14 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    border: "3px solid #e9d5ff",
                    borderTopColor: "#8b5cf6",
                    animation: "spin 0.8s linear infinite",
                  }} />
                  <p style={{ color: "var(--ink-3)" }}>מנתח את המועמדויות שלך...</p>
                </div>
              )}
              {error && (
                <div style={{
                  background: "#fef2f2", border: "1px solid #fecaca",
                  color: "#b91c1c", borderRadius: 10, padding: "12px 16px", fontSize: 13,
                }}>
                  {error}
                </div>
              )}
              {tips && (
                <div className="ai-tip">
                  <div className="ai-tip-body">{tips}</div>
                </div>
              )}
            </div>

            <div className="modal-foot">
              <button onClick={() => setOpen(false)} className="btn btn-ghost">סגור</button>
              <button onClick={fetchTips} disabled={loading} className="btn btn-ai">
                נתח מחדש
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
