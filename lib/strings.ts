export type Lang = "he" | "en";

export const STRINGS = {
  he: {
    // ── Nav / header ──────────────────────────────────────────────────────
    brand: "מעקב מועמדויות",
    sub: "נהל את חיפוש העבודה שלך",
    add: "הוסף מועמדות",
    aiTips: "טיפים מ-AI",
    logout: "התנתק",

    // ── Filters ───────────────────────────────────────────────────────────
    all: "הכל",
    active: "בתהליך",
    interview: "ראיון",
    offer: "הצעה",
    rejected: "נדחיתי",
    allFields: "כל התחומים",
    searchPh: "חפש חברה, תפקיד…",

    // ── Table headers ─────────────────────────────────────────────────────
    tableCompany: "חברה",
    tableField: "תחום",
    tableDate: "תאריך הגשה",
    tableProgress: "התקדמות",
    tableCv: 'קו"ח',
    tableNotes: "קישור / הערות",
    view: "צפה",

    // ── Empty state ───────────────────────────────────────────────────────
    emptyTitle: "אין מועמדויות עדיין",
    emptySub: 'לחץ על ״הוסף מועמדות״ כדי להתחיל',

    // ── Stats ─────────────────────────────────────────────────────────────
    statTotal: "סה״כ מועמדויות",
    statInterviews: "ראיונות",
    statOffers: "הצעות עבודה",
    statConversion: "אחוז המרה לראיון",
    staleTitle: "{n} מועמדויות לא עודכנו מעל 7 ימים",

    // ── Tweaks panel ──────────────────────────────────────────────────────
    tweaksTitle: "Tweaks",
    theme: "ערכת נושא",
    density: "צפיפות",
    viewType: "תצוגה",
    language: "שפה",
    light: "בהיר",
    dark: "כהה",
    comfortable: "נוח",
    compact: "צפוף",
    tableView: "טבלה",
    cardsView: "כרטיסים",
    kanbanView: "לוח",

    // ── Kanban columns ────────────────────────────────────────────────────
    colApplied: "הוגשה",
    colScreen: "סינון",
    colFinal: "ראיון סופי",
    colOffer: "הצעה",
    colRejected: "נדחיתי",

    // ── Misc ──────────────────────────────────────────────────────────────
    confirmDelete: "למחוק את המועמדות?",
    loading: "טוען מועמדויות...",

    // ── Demo banner ───────────────────────────────────────────────────────
    demoBanner: "מצב הדגמה — השינויים אינם נשמרים",
    demoExit: "יציאה מהדמו",

    // ── Job form ──────────────────────────────────────────────────────────
    formAddTitle: "הוספת מועמדות חדשה",
    formEditTitle: "עריכת מועמדות",
    companyLabel: "שם החברה",
    companyPh: "לדוגמה: Google",
    roleLabel: "תפקיד",
    rolePh: "לדוגמה: מפתח Full Stack",
    fieldLabel: "תחום",
    fieldPh: "טכנולוגיה, שיווק, מכירות...",
    dateLabel: "תאריך הגשה",
    stagesLabel: "שלבי התהליך",
    stageCycleTip: "לחץ לשינוי סטטוס",
    stageNamePh: "שם שלב",
    removeStageTitle: "הסר שלב",
    addStageBtn: "הוסף שלב",
    stageHelpText: "לחץ על עיגול לשינוי סטטוס:",
    stageColors: "אפור ← ירוק ← אדום",
    jobLinkLabel: "קישור למשרה",
    cvLabel: 'קו"ח (PDF / Word)',
    cvPickFile: 'בחר קובץ קו״ח',
    cvExisting: "קובץ קיים — לחץ לצפייה",
    notesLabel: "הערות",
    notesPh: "מידע נוסף, שם איש קשר...",
    cancel: "ביטול",
    save: "שמור",
    update: "עדכן",
    saving: "שומר...",
    required: "חובה",

    // ── Field suggestions ─────────────────────────────────────────────────
    fieldSuggestions: "טכנולוגיה,שיווק,מכירות,משאבי אנוש,פיננסים,עיצוב,ניהול מוצר,נתונים ו-AI,אבטחת מידע,תפעול,משפטי,חינוך,בריאות,נדל״ן,לוגיסטיקה,שירות לקוחות",
  },
  en: {
    // ── Nav / header ──────────────────────────────────────────────────────
    brand: "Job Tracker",
    sub: "Manage your job search",
    add: "Add application",
    aiTips: "AI Tips",
    logout: "Log out",

    // ── Filters ───────────────────────────────────────────────────────────
    all: "All",
    active: "Active",
    interview: "Interviewing",
    offer: "Offer",
    rejected: "Rejected",
    allFields: "All fields",
    searchPh: "Search company, role…",

    // ── Table headers ─────────────────────────────────────────────────────
    tableCompany: "Company",
    tableField: "Field",
    tableDate: "Applied",
    tableProgress: "Progress",
    tableCv: "Resume",
    tableNotes: "Link / notes",
    view: "View",

    // ── Empty state ───────────────────────────────────────────────────────
    emptyTitle: "No applications yet",
    emptySub: 'Click "Add application" to get started',

    // ── Stats ─────────────────────────────────────────────────────────────
    statTotal: "Total applications",
    statInterviews: "Interviews",
    statOffers: "Offers",
    statConversion: "Interview rate",
    staleTitle: "{n} applications not updated in 7+ days",

    // ── Tweaks panel ──────────────────────────────────────────────────────
    tweaksTitle: "Tweaks",
    theme: "Theme",
    density: "Density",
    viewType: "View",
    language: "Language",
    light: "Light",
    dark: "Dark",
    comfortable: "Comfortable",
    compact: "Compact",
    tableView: "Table",
    cardsView: "Cards",
    kanbanView: "Kanban",

    // ── Kanban columns ────────────────────────────────────────────────────
    colApplied: "Applied",
    colScreen: "Screen",
    colFinal: "Interviewing",
    colOffer: "Offer",
    colRejected: "Rejected",

    // ── Misc ──────────────────────────────────────────────────────────────
    confirmDelete: "Delete this application?",
    loading: "Loading applications...",

    // ── Demo banner ───────────────────────────────────────────────────────
    demoBanner: "Demo mode — changes are not saved",
    demoExit: "Exit demo",

    // ── Job form ──────────────────────────────────────────────────────────
    formAddTitle: "New Application",
    formEditTitle: "Edit Application",
    companyLabel: "Company",
    companyPh: "e.g. Google",
    roleLabel: "Role",
    rolePh: "e.g. Full Stack Developer",
    fieldLabel: "Field",
    fieldPh: "Technology, Marketing, Sales...",
    dateLabel: "Date applied",
    stagesLabel: "Process stages",
    stageCycleTip: "Click to change status",
    stageNamePh: "Stage",
    removeStageTitle: "Remove stage",
    addStageBtn: "Add stage",
    stageHelpText: "Click circle to change status:",
    stageColors: "gray → green → red",
    jobLinkLabel: "Job link",
    cvLabel: "Resume (PDF / Word)",
    cvPickFile: "Choose resume file",
    cvExisting: "Existing file — click to view",
    notesLabel: "Notes",
    notesPh: "Extra info, contact name...",
    cancel: "Cancel",
    save: "Save",
    update: "Update",
    saving: "Saving...",
    required: "required",

    // ── Field suggestions ─────────────────────────────────────────────────
    fieldSuggestions: "Technology,Marketing,Sales,HR,Finance,Design,Product,Data & AI,Security,Operations,Legal,Education,Healthcare,Real Estate,Logistics,Customer Success",
  },
} as const;

export type Strings = { [K in keyof typeof STRINGS.he]: string };
