"use client";

import { Fragment } from "react";
import { JobStages, applyStageClick } from "@/lib/supabase";

interface TimelineProps {
  stages: JobStages;
  onChange?: (updated: JobStages) => void;
  compact?: boolean;
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

export default function Timeline({ stages, onChange, compact = false }: TimelineProps) {
  // The "active" node: first not_reached stage after all completed ones.
  // If there's a failure, nothing is active.
  const hasFailure = stages.some((s) => s.state === "failed");
  const activeIdx  = hasFailure
    ? -1
    : stages.findIndex((s) => s.state === "not_reached");

  return (
    <div
      className="timeline"
      dir="rtl"
      style={{ minWidth: compact ? Math.max(180, stages.length * 46) : undefined }}
    >
      {stages.map((stage, idx) => {
        const isLast = idx === stages.length - 1;
        const next   = !isLast ? stages[idx + 1] : null;

        // Connector class
        const connectorClass =
          stage.state === "completed" && next?.state === "completed" ? "completed" :
          stage.state === "completed" && next?.state === "failed"    ? "failed"    :
          "";

        // Node class
        const nodeClass = [
          "timeline-node",
          stage.state === "completed" ? "completed" : "",
          stage.state === "failed"    ? "failed"    : "",
          idx === activeIdx           ? "active"    : "",
          !onChange                   ? "readonly"  : "",
        ].filter(Boolean).join(" ");

        return (
          <Fragment key={idx}>
            <div className="timeline-node-wrap">
              <button
                type="button"
                className={nodeClass}
                onClick={() => onChange?.(applyStageClick(stages, idx))}
                disabled={!onChange}
                title={stage.name}
                aria-label={`${stage.name}: ${
                  stage.state === "completed" ? "עבר" :
                  stage.state === "failed"    ? "נכשל" : "טרם הגיע"
                }`}
                style={{
                  width:  compact ? 24 : 28,
                  height: compact ? 24 : 28,
                }}
              >
                {stage.state === "completed" && <CheckIcon />}
                {stage.state === "failed"    && <XIcon />}
                {stage.state === "not_reached" && idx === activeIdx && (
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "white", opacity: 0.9 }} />
                )}
              </button>
              <span className="timeline-label">
                {stage.name || `שלב ${idx + 1}`}
              </span>
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
