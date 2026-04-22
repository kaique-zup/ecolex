import { TREE_SPECIES, speciesByDifficulty, DEFAULT_SPECIES_ID } from "./data/treeSpecies.js";
import { getWordDifficulty } from "./difficulty.js";

export function pickSpeciesForWord(word, wordLang) {
  if (!word) return DEFAULT_SPECIES_ID;
  const diff = getWordDifficulty(word, wordLang);
  const pool = speciesByDifficulty(diff);
  if (!pool.length) return DEFAULT_SPECIES_ID;
  return pool[word.id % pool.length];
}

export { TREE_SPECIES, DEFAULT_SPECIES_ID };
