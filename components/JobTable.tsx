"use client";

import { Job, JobStages, isJobActive, DEFAULT_STAGES } from "@/lib/supabase";
import Timeline from "@/components/Timeline";
import { logoStyle, logoInitials } from "@/lib/utils";
import { Strings } from "@/lib/strings";

interface JobTableProps {
  jobs:             Job[];
  onEdit:           (job: Job) => void;
  onDelete:         (id: string) => void;
  onTimelineChange: (id: string, stages: JobStages) => void;
  t:    Strings;
  lang: string;
}

export default function JobTable({ jobs, onEdit, onDelete, onTimelineChange, t, lang }: JobTableProps) {
  const safeStages = (job: Job): JobStages =>
    job.stages?.length ? job.stages : DEFAULT_STAGES.map((s) => ({ ...s }));

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

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "28%" }}>{t.tableCompany}</th>
            <th>{t.tableField}</th>
            <th>{t.tableDate}</th>
            <th style={{ minWidth: 300 }}>{t.tableProgress}</th>
            <th>{t.tableCv}</th>
            <th>{t.tableNotes}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => {
            const stages  = safeStages(job);
            const isStale = isJobActive(stages) && new Date(job.updated_at) < sevenDaysAgo;

            return (
              <tr key={job.id} className={isStale ? "stale" : ""}>
                {/* Company + role */}
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div className="co-logo" style={logoStyle(job.company_name)}>
                      {logoInitials(job.company_name)}
                    </div>
                    <div>
                      <div className="company-name-cell" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {isStale && (
                          <span title={lang === "he" ? "לא עודכן מעל 7 ימים" : "Not updated in 7+ days"}
                            style={{ color: "#f59e0b", fontSize: 13 }}>●</span>
                        )}
                        {job.company_name}
                      </div>
                      <div className="company-role-cell">{job.role}</div>
                    </div>
                  </div>
                </td>

                {/* Field */}
                <td>
                  {job.field
                    ? <span className="field-tag">{job.field}</span>
                    : <span style={{ color: "var(--ink-5)" }}>—</span>}
                </td>

                {/* Date */}
                <td className="date-cell">
                  {new Date(job.date_applied).toLocaleDateString(lang === "he" ? "he-IL" : "en-GB")}
                </td>

                {/* Timeline */}
                <td>
                  <Timeline
                    stages={stages}
                    onChange={(updated) => onTimelineChange(job.id, updated)}
                    compact
                  />
                </td>

                {/* CV */}
                <td>
                  {job.cv_url ? (
                    <a href={job.cv_url} target="_blank" rel="noopener noreferrer" className="cv-link">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                        <path d="M4 2h6l4 4v8H4V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                        <path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      </svg>
                      {t.view}
                    </a>
                  ) : (
                    <span style={{ color: "var(--ink-5)" }}>—</span>
                  )}
                </td>

                {/* Notes / link */}
                <td>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {job.job_link && (
                      <a href={job.job_link} target="_blank" rel="noopener noreferrer"
                        style={{ color: "var(--accent)", fontSize: 12.5, fontWeight: 500 }}>
                        {lang === "he" ? "קישור למשרה ↗" : "Job link ↗"}
                      </a>
                    )}
                    {job.notes && (
                      <span title={job.notes}
                        style={{
                          color: "var(--ink-3)", fontSize: 12.5, cursor: "help",
                          maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis",
                          whiteSpace: "nowrap", display: "block",
                        }}>
                        {job.notes}
                      </span>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td>
                  <div className="row-actions">
                    <button onClick={() => onEdit(job)} title={lang === "he" ? "ערוך" : "Edit"}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      className="delete"
                      title={lang === "he" ? "מחק" : "Delete"}
                      onClick={() => {
                        if (confirm(t.confirmDelete)) onDelete(job.id);
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
