import { TREE_SPECIES, speciesByDifficulty, DEFAULT_SPECIES_ID } from "./data/treeSpecies.js";
import { getWordDifficulty } from "./difficulty.js";
import { rollRarity, DEFAULT_RARITY } from "./data/rarityTiers.js";
import { rollMaterial } from "./data/materials.js";

export function pickSpeciesForWord(word, wordLang) {
  if (!word) return DEFAULT_SPECIES_ID;
  const diff = getWordDifficulty(word, wordLang);
  const pool = speciesByDifficulty(diff);
  if (!pool.length) return DEFAULT_SPECIES_ID;
  return pool[word.id % pool.length];
}

export function rollForestEntry(word, wordLang, rng = Math.random) {
  const difficulty = getWordDifficulty(word, wordLang);
  const speciesId = pickSpeciesForWord(word, wordLang);
  const rarity = rollRarity(difficulty, rng);
  const material = rollMaterial(rng);
  return { speciesId, rarity, material, difficulty };
}

export { TREE_SPECIES, DEFAULT_SPECIES_ID, DEFAULT_RARITY };
