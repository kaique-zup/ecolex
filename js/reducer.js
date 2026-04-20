import { pickWord, pickPowerup, normalize } from './utils.js';

export const initialState = {
  phase: "setup",
  word: null,
  guessed: [],
  missCount: 0,
  powerup: { kind: null, used: false, activeEffect: null },
  startedAt: null,
  wordLang: "en",
  hintLang: "pt",
  category: "all",
  showExtraHint: false,
  lastAction: null,
};

export function gameReducer(state, action) {
  switch (action.type) {
    case "START_ROUND": {
      const { pool, playedIds, wordLang, hintLang, category } = action.payload;
      const word = pickWord(pool, playedIds);
      const powerupKind = pickPowerup();
      return {
        ...state,
        phase: "playing",
        word,
        guessed: [],
        missCount: 0,
        powerup: { kind: powerupKind, used: false, activeEffect: null },
        startedAt: Date.now(),
        wordLang, hintLang, category,
        showExtraHint: false,
        lastAction: { type: "START_ROUND" },
      };
    }
    case "GUESS_LETTER": {
      if (state.phase !== "playing") return state;
      const letter = normalize(action.payload.letter);
      if (!letter.match(/^[A-Z]$/)) return state;
      if (state.guessed.includes(letter)) return state;

      const letters = normalize(state.word.languages[state.wordLang].word).split("");
      const hit = letters.includes(letter);

      const nextGuessed = [...state.guessed, letter];
      let nextMiss = state.missCount;
      let nextActive = state.powerup.activeEffect;
      let actionTag = hit ? "HIT" : "MISS";

      if (!hit) {
        if (state.powerup.activeEffect === "shield") {
          nextActive = null;
          actionTag = "SHIELDED";
        } else {
          nextMiss = state.missCount + 1;
        }
      }

      const allRevealed = letters.every(l => l === " " || nextGuessed.includes(l));
      let phase = state.phase;
      if (allRevealed) phase = "victory";
      else if (nextMiss >= 6) phase = "defeat";

      return {
        ...state,
        guessed: nextGuessed,
        missCount: nextMiss,
        phase,
        powerup: { ...state.powerup, activeEffect: nextActive },
        lastAction: { type: actionTag, letter },
      };
    }
    case "ACTIVATE_POWERUP": {
      if (state.phase !== "playing") return state;
      if (state.powerup.used) return state;
      const { kind } = state.powerup;
      let patch = { powerup: { ...state.powerup, used: true } };
      let tip = null;
      if (kind === "rain") {
        const letters = normalize(state.word.languages[state.wordLang].word).split("");
        const hidden = [...new Set(letters.filter(l => l !== " " && !state.guessed.includes(l)))];
        if (hidden.length === 0) return state;
        const revealLetter = hidden[Math.floor(Math.random() * hidden.length)];
        const nextGuessed = [...state.guessed, revealLetter];
        const allRevealed = letters.every(l => l === " " || nextGuessed.includes(l));
        patch.guessed = nextGuessed;
        if (allRevealed) patch.phase = "victory";
        tip = "rain";
      } else if (kind === "sun") {
        patch.powerup.activeEffect = "shield";
        tip = "sun";
      } else if (kind === "compost") {
        const letters = normalize(state.word.languages[state.wordLang].word).split("");
        const hidden = [...new Set(letters.filter(l => l !== " " && !state.guessed.includes(l)))];
        if (hidden.length === 0) return state;
        const shuffled = [...hidden].sort(() => Math.random() - 0.5);
        const toReveal = shuffled.slice(0, Math.min(2, hidden.length));
        const nextGuessed = [...state.guessed, ...toReveal];
        const allRevealed = letters.every(l => l === " " || nextGuessed.includes(l));
        patch.guessed = nextGuessed;
        if (allRevealed) patch.phase = "victory";
        tip = "compost";
      }
      patch.lastAction = { type: "POWERUP", kind, tip };
      return { ...state, ...patch };
    }
    case "RESIGN": {
      if (state.phase !== "playing") return state;
      return { ...state, phase: "defeat", lastAction: { type: "RESIGN" } };
    }
    case "RESET_TO_SETUP": {
      return { ...state, phase: "setup", lastAction: null };
    }
    case "CLEAR_LAST_ACTION": {
      return { ...state, lastAction: null };
    }
    default:
      return state;
  }
}
