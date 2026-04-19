import type { CSSProperties } from "react";
import { JobStages } from "@/lib/supabase";

const LOGO_GRADIENTS = [
  "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
  "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
  "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
  "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
  "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
  "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)",
  "linear-gradient(135deg, #f97316 0%, #f59e0b 100%)",
  "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)",
];

export function logoStyle(name: string): CSSProperties {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = ((h * 31 + name.charCodeAt(i)) >>> 0);
  return { background: LOGO_GRADIENTS[h % LOGO_GRADIENTS.length] };
}

export function logoInitials(name: string): string {
  const clean = name.replace(/[^a-zA-Z\u05D0-\u05EA0-9 ]/g, "");
  const parts = clean.split(/\s+/).filter(Boolean).slice(0, 2);
  return parts.map(p => p[0]).join("").toUpperCase() || name.slice(0, 2).toUpperCase();
}

export function getKanbanColumn(stages: JobStages): string {
  if (stages.some(s => s.state === "failed")) return "rejected";
  const last = stages[stages.length - 1];
  if (last?.state === "completed" && /הצעה|offer/i.test(last.name)) return "offer";
  const completedCount = stages.filter(s => s.state === "completed").length;
  if (completedCount === 0) return "applied";
  if (completedCount >= 3) return "final";
  return "screen";
}
