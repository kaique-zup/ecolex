const STORAGE_KEY = "ecolex.v1";

const DEFAULT_PERSISTED = {
  schema: 1,
  preferences: { wordLang: "en", hintLang: "pt", category: "all", reducedMotion: false },
  streak: 0,
  bestStreak: 0,
  stats: { wins: 0, losses: 0, byCategory: {} },
  glossary: [],
  playedIds: [],
  onboarded: false,
};

export function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PERSISTED };
    const parsed = JSON.parse(raw);
    if (parsed.schema !== 1) return { ...DEFAULT_PERSISTED };
    return { ...DEFAULT_PERSISTED, ...parsed };
  } catch (err) {
    console.warn("Falha ao ler localStorage, usando padrão:", err);
    return { ...DEFAULT_PERSISTED };
  }
}

export function savePersisted(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn("Falha ao persistir:", err);
  }
}
