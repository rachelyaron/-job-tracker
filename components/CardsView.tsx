"use client";

import { Job, JobStages, isJobActive, DEFAULT_STAGES } from "@/lib/supabase";
import Timeline from "@/components/Timeline";
import { logoStyle, logoInitials } from "@/lib/utils";
import { Strings } from "@/lib/strings";

interface CardsViewProps {
  jobs:             Job[];
  onEdit:           (job: Job) => void;
  onDelete:         (id: string) => void;
  onTimelineChange: (id: string, stages: JobStages) => void;
  t:    Strings;
  lang: string;
}

export default function CardsView({ jobs, onEdit, onDelete, onTimelineChange, t, lang }: CardsViewProps) {
  const safe = (j: Job): JobStages => j.stages?.length ? j.stages : DEFAULT_STAGES.map(s => ({ ...s }));
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  if (jobs.length === 0) {
    return (
      <div className="table-wrap">
        <div className="empty">
          <div className="empty-ico">📋</div>
          <p className="empty-title">{t.emptyTitle}</p>
          <p className="empty-sub">{t.emptySub}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cards-grid">
      {jobs.map((job) => {
        const stages  = safe(job);
        const isStale = isJobActive(stages) && new Date(job.updated_at) < sevenDaysAgo;

        return (
          <div
            key={job.id}
            className={`job-card${isStale ? " stale" : ""}`}
            onClick={() => onEdit(job)}
          >
            {/* Header row */}
            <div className="job-card-head">
              <div className="co-logo" style={logoStyle(job.company_name)}>
                {logoInitials(job.company_name)}
              </div>
              <div className="job-card-body">
                <div className="job-card-role">{job.role}</div>
                <div className="job-card-company">
                  <span>{job.company_name}</span>
                  {job.field && <><span className="dot" /><span>{job.field}</span></>}
                </div>
              </div>
            </div>

            {/* Timeline — stop click propagation so stage clicks don't open edit */}
            <div onClick={(e) => e.stopPropagation()}>
              <Timeline
                stages={stages}
                onChange={(updated) => onTimelineChange(job.id, updated)}
              />
            </div>

            {/* Notes snippet */}
            {job.notes && (
              <div style={{
                fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.5,
                padding: "8px 10px", background: "var(--panel)", borderRadius: 8,
              }}>
                {job.notes}
              </div>
            )}

            {/* Footer */}
            <div className="job-card-foot">
              <div style={{ fontSize: 12, color: "var(--ink-3)" }}>
                {new Date(job.date_applied).toLocaleDateString(lang === "he" ? "he-IL" : "en-GB")}
              </div>
              <div className="job-card-actions" onClick={(e) => e.stopPropagation()}>
                {job.cv_url && (
                  <a href={job.cv_url} target="_blank" rel="noopener noreferrer"
                    className="btn btn-sm btn-icon btn-ghost" title={t.tableCv}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M4 2h6l4 4v8H4V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
                <button
                  className="btn btn-sm btn-icon btn-ghost"
                  onClick={() => onEdit(job)}
                  title={lang === "he" ? "ערוך" : "Edit"}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  className="btn btn-sm btn-icon btn-ghost btn-danger"
                  onClick={() => {
                    if (confirm(t.confirmDelete)) onDelete(job.id);
                  }}
                  title={lang === "he" ? "מחק" : "Delete"}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
