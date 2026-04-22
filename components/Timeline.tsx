"use client";

import { Fragment } from "react";
import { JobStages, applyStageClick, STAGE_NAME_EN } from "@/lib/supabase";

interface TimelineProps {
  stages:    JobStages;
  onChange?: (updated: JobStages) => void;
  compact?:  boolean;
  lang?:     string;
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 8.5L6.5 12.5L13.5 4" stroke="white" strokeWidth="2.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
      <path d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5" stroke="white"
        strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function displayName(name: string, lang?: string): string {
  if (lang !== "en") return name;
  return STAGE_NAME_EN[name] ?? name;
}

export default function Timeline({ stages, onChange, compact = false, lang }: TimelineProps) {
  const hasFailure = stages.some((s) => s.state === "failed");
  const activeIdx  = hasFailure
    ? -1
    : stages.findIndex((s) => s.state === "not_reached");

  return (
    <div
      className="timeline"
      dir={lang === "he" ? "rtl" : "ltr"}
      style={{ minWidth: compact ? Math.max(180, stages.length * 46) : undefined }}
    >
      {stages.map((stage, idx) => {
        const isLast = idx === stages.length - 1;
        const next   = !isLast ? stages[idx + 1] : null;

        const connectorClass =
          stage.state === "completed" && next?.state === "completed" ? "completed" :
          stage.state === "completed" && next?.state === "failed"    ? "failed"    :
          "";

        const nodeClass = [
          "timeline-node",
          stage.state === "completed" ? "completed" : "",
          stage.state === "failed"    ? "failed"    : "",
          idx === activeIdx           ? "active"    : "",
          !onChange                   ? "readonly"  : "",
        ].filter(Boolean).join(" ");

        const label = displayName(stage.name, lang) || `${idx + 1}`;

        return (
          <Fragment key={idx}>
            <div className="timeline-node-wrap">
              <button
                type="button"
                className={nodeClass}
                onClick={() => onChange?.(applyStageClick(stages, idx))}
                disabled={!onChange}
                title={label}
                aria-label={label}
                style={{ width: compact ? 24 : 28, height: compact ? 24 : 28 }}
              >
                {stage.state === "completed" && <CheckIcon />}
                {stage.state === "failed"    && <XIcon />}
                {stage.state === "not_reached" && idx === activeIdx && (
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "white", opacity: 0.9 }} />
                )}
              </button>
              <span className="timeline-label">{label}</span>
            </div>

            {!isLast && (
              <div className={`timeline-connector ${connectorClass}`} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
