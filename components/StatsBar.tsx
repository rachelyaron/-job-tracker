"use client";

import { Job, hasInterview, hasOffer, isJobActive, DEFAULT_STAGES } from "@/lib/supabase";

interface StatsBarProps { jobs: Job[]; }

export default function StatsBar({ jobs }: StatsBarProps) {
  const safe = (j: Job) => j.stages?.length ? j.stages : DEFAULT_STAGES;
  const total          = jobs.length;
  const interviews     = jobs.filter((j) => hasInterview(safe(j))).length;
  const offers         = jobs.filter((j) => hasOffer(safe(j))).length;
  const conversionRate = total > 0 ? Math.round((interviews / total) * 100) : 0;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const stale = jobs.filter(
    (j) => isJobActive(safe(j)) && new Date(j.updated_at) < sevenDaysAgo
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {stale.length > 0 && (
        <div className="stale-banner">
          <div className="stale-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="stale-title">
              תזכורת: {stale.length} מועמדות לא עודכנו מעל 7 ימים
            </p>
            <p className="stale-body">
              {stale.map((j) => `${j.company_name} — ${j.role}`).join(" | ")}
            </p>
          </div>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat tint-blue">
          <div className="stat-accent" />
          <div className="stat-head">
            <span className="stat-label">סה״כ מועמדויות</span>
            <div className="stat-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="stat-value">{total}</div>
          <div className="stat-sub">בקשות שהוגשו</div>
        </div>

        <div className="stat tint-purple">
          <div className="stat-accent" />
          <div className="stat-head">
            <span className="stat-label">ראיונות</span>
            <div className="stat-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="stat-value">{interviews}</div>
          <div className="stat-sub">הגעת לראיון</div>
        </div>

        <div className="stat tint-green">
          <div className="stat-accent" />
          <div className="stat-head">
            <span className="stat-label">הצעות עבודה</span>
            <div className="stat-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="stat-value">{offers}</div>
          <div className="stat-sub">הצעות שהתקבלו</div>
        </div>

        <div className="stat tint-orange">
          <div className="stat-accent" />
          <div className="stat-head">
            <span className="stat-label">אחוז המרה</span>
            <div className="stat-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 20V10M12 20V4M6 20v-6"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="stat-value">{conversionRate}%</div>
          <div className="stat-sub">הגשה לראיון</div>
        </div>
      </div>
    </div>
  );
}
