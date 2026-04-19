"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { STRINGS, Lang, Strings } from "@/lib/strings";

export type View    = "table" | "cards" | "kanban";
export type Theme   = "light" | "dark";
export type Density = "comfortable" | "compact";

interface Settings {
  theme:      Theme;
  setTheme:   (v: Theme) => void;
  density:    Density;
  setDensity: (v: Density) => void;
  view:       View;
  setView:    (v: View) => void;
  lang:       Lang;
  setLang:    (v: Lang) => void;
  t:          Strings;
}

const SettingsContext = createContext<Settings | null>(null);

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme,   setThemeState]   = useState<Theme>("light");
  const [density, setDensityState] = useState<Density>("comfortable");
  const [view,    setViewState]    = useState<View>("table");
  const [lang,    setLangState]    = useState<Lang>("he");
  const [mounted, setMounted]      = useState(false);

  // Read persisted prefs on mount
  useEffect(() => {
    setThemeState(  (localStorage.getItem("jt-theme")   as Theme)   || "light");
    setDensityState((localStorage.getItem("jt-density") as Density) || "comfortable");
    setViewState(   (localStorage.getItem("jt-view")    as View)    || "table");
    setLangState(   (localStorage.getItem("jt-lang")    as Lang)    || "he");
    setMounted(true);
  }, []);

  // Apply to <html>
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.setAttribute("data-theme",   theme);
    root.setAttribute("data-density", density);
    root.setAttribute("lang", lang);
    root.setAttribute("dir",  lang === "he" ? "rtl" : "ltr");
    document.body.classList.toggle("ltr", lang === "en");
  }, [theme, density, lang, mounted]);

  const setTheme   = (v: Theme)   => { setThemeState(v);   localStorage.setItem("jt-theme",   v); };
  const setDensity = (v: Density) => { setDensityState(v); localStorage.setItem("jt-density", v); };
  const setView    = (v: View)    => { setViewState(v);    localStorage.setItem("jt-view",    v); };
  const setLang    = (v: Lang)    => { setLangState(v);    localStorage.setItem("jt-lang",    v); };

  return (
    <SettingsContext.Provider value={{
      theme, setTheme, density, setDensity, view, setView, lang, setLang,
      t: STRINGS[lang],
    }}>
      {children}
    </SettingsContext.Provider>
  );
}
