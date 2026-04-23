"use client";

import { useSettings } from "@/contexts/SettingsContext";

export default function AuthForm() {
  const { lang, setLang, t } = useSettings();

  const handleDemo = () => {
    window.location.href = "/?demo=true";
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">

        {/* Language toggle */}
        <div className="auth-lang-toggle">
          <button
            type="button"
            className={`auth-lang-btn${lang === "he" ? " active" : ""}`}
            onClick={() => setLang("he")}
          >
            עברית
          </button>
          <button
            type="button"
            className={`auth-lang-btn${lang === "en" ? " active" : ""}`}
            onClick={() => setLang("en")}
          >
            English
          </button>
        </div>

        <div className="auth-logo">📋</div>
        <h1 className="auth-title">{t.brand}</h1>
        <p className="auth-sub">{t.sub}</p>

        <p style={{
          marginTop: 24, marginBottom: 4,
          fontSize: 14, color: "var(--ink-2)",
          textAlign: "center", lineHeight: 1.6,
        }}>
          {t.authDemoMsg}
        </p>

        <button type="button" onClick={handleDemo} className="demo-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M5 3l14 9-14 9V3z" fill="currentColor"/>
          </svg>
          {t.authDemoBtn}
        </button>
      </div>
    </div>
  );
}
