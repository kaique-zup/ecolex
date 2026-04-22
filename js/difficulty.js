import { normalize } from "./utils.js";

export const DIFFICULTY_TIERS = ["easy", "medium", "hard", "legendary"];

export function getWordDifficulty(word, wordLang) {
  const w = normalize(word.languages[wordLang].word).replace(/\s+/g, "");
  const len = w.length;
  const unique = new Set(w).size;
  const minAge = word.minAge ?? 6;

  let score = 0;
  if (len >= 12) score += 3;
  else if (len >= 9) score += 2;
  else if (len >= 7) score += 1;

  if (minAge >= 13) score += 3;
  else if (minAge >= 11) score += 2;
  else if (minAge >= 9) score += 1;

  if (unique >= 9) score += 1;

  if (score >= 6) return "legendary";
  if (score >= 4) return "hard";
  if (score >= 2) return "medium";
  return "easy";
}
