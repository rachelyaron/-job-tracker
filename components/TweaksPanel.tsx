"use client";

import { useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";

export default function TweaksPanel() {
  const { theme, setTheme, density, setDensity, view, setView, lang, setLang, t } = useSettings();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="tweaks-btn"
        onClick={() => setOpen(o => !o)}
        title="Tweaks"
        aria-label="Open tweaks panel"
      >
        {/* sliders icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="9"  cy="6"  r="2" fill="white"/>
          <circle cx="15" cy="12" r="2" fill="white"/>
          <circle cx="9"  cy="18" r="2" fill="white"/>
        </svg>
      </button>

      {open && (
        <div className="tweaks">
          <div className="tweaks-head">
            <div className="tweaks-title">{t.tweaksTitle}</div>
            <button
              className="btn btn-sm btn-icon btn-ghost"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="tweaks-row">
            <div className="tweaks-label">{t.viewType}</div>
            <div className="segmented">
              <button className={view === "table"  ? "active" : ""} onClick={() => setView("table")}>{t.tableView}</button>
              <button className={view === "cards"  ? "active" : ""} onClick={() => setView("cards")}>{t.cardsView}</button>
              <button className={view === "kanban" ? "active" : ""} onClick={() => setView("kanban")}>{t.kanbanView}</button>
            </div>
          </div>

          <div className="tweaks-row">
            <div className="tweaks-label">{t.theme}</div>
            <div className="segmented">
              <button className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")}>{t.light}</button>
              <button className={theme === "dark"  ? "active" : ""} onClick={() => setTheme("dark")}>{t.dark}</button>
            </div>
          </div>

          <div className="tweaks-row">
            <div className="tweaks-label">{t.density}</div>
            <div className="segmented">
              <button className={density === "comfortable" ? "active" : ""} onClick={() => setDensity("comfortable")}>{t.comfortable}</button>
              <button className={density === "compact"     ? "active" : ""} onClick={() => setDensity("compact")}>{t.compact}</button>
            </div>
          </div>

          <div className="tweaks-row">
            <div className="tweaks-label">{t.language}</div>
            <div className="segmented">
              <button className={lang === "he" ? "active" : ""} onClick={() => setLang("he")}>עברית</button>
              <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>English</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
