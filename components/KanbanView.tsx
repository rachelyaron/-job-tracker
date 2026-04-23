"use client";

import { Job, JobStages, DEFAULT_STAGES } from "@/lib/supabase";
import { logoStyle, logoInitials, getKanbanColumn } from "@/lib/utils";
import { Strings } from "@/lib/strings";

interface KanbanViewProps {
  jobs:             Job[];
  onEdit:           (job: Job) => void;
  onTimelineChange: (id: string, stages: JobStages) => void;
  t:    Strings;
  lang: string;
}

function StageProgress({ stages, lang }: { stages: JobStages; lang: string }) {
  const completed = stages.filter(s => s.state === "completed").length;
  const failed    = stages.filter(s => s.state === "failed").length;
  const total     = stages.length;
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;

  const barColor = failed > 0
    ? "var(--state-failed)"
    : completed === total
      ? "var(--state-completed)"
      : "var(--accent)";

  const label = lang === "he"
    ? `${completed}/${total} שלבים`
    : `${completed}/${total} stages`;

  return (
    <div className="kprogress">
      <div className="kprogress-bar-wrap">
        <div
          className="kprogress-bar-fill"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>
      <span className="kprogress-label">{label}</span>
    </div>
  );
}

export default function KanbanView({ jobs, onEdit, onTimelineChange: _onTimelineChange, t, lang }: KanbanViewProps) {
  const safe = (j: Job): JobStages => j.stages?.length ? j.stages : DEFAULT_STAGES.map(s => ({ ...s }));

  const cols = [
    { id: "applied",  title: t.colApplied,  color: "#64748b" },
    { id: "screen",   title: t.colScreen,   color: "#3b82f6" },
    { id: "final",    title: t.colFinal,    color: "#8b5cf6" },
    { id: "offer",    title: t.colOffer,    color: "#10b981" },
    { id: "rejected", title: t.colRejected, color: "#ef4444" },
  ];

  const byCol: Record<string, Job[]> = Object.fromEntries(cols.map(c => [c.id, []]));
  jobs.forEach(job => {
    const col = getKanbanColumn(safe(job));
    (byCol[col] ??= []).push(job);
  });

  return (
    <div className="kanban">
      {cols.map(col => (
        <div key={col.id} className="kcol">
          <div className="kcol-head">
            <span className="kcol-dot" style={{ background: col.color }} />
            <span className="kcol-name">{col.title}</span>
            <span className="kcol-count">{byCol[col.id].length}</span>
          </div>
          <div className="kcol-body">
            {byCol[col.id].map(job => {
              const stages = safe(job);
              return (
                <div key={job.id} className="kcard" onClick={() => onEdit(job)}>
                  <div className="kcard-head">
                    <div
                      className="co-logo"
                      style={{ ...logoStyle(job.company_name), width: 30, height: 30, fontSize: 11, borderRadius: 8 }}
                    >
                      {logoInitials(job.company_name)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="kcard-role">{job.role}</div>
                      <div className="kcard-company">{job.company_name}</div>
                    </div>
                  </div>

                  <StageProgress stages={stages} lang={lang} />

                  <div className="kcard-meta">
                    <span>
                      {new Date(job.date_applied).toLocaleDateString(lang === "he" ? "he-IL" : "en-GB")}
                    </span>
                    {job.field && <><span>·</span><span>{job.field}</span></>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
