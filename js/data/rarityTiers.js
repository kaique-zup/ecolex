export const RARITY_TIERS = ["common", "uncommon", "rare", "epic", "legendary", "mythic"];

export const DEFAULT_RARITY = "common";

export const RARITY_META = {
  common:    { weight: 60,  haloClass: "halo-common",    nameKey: "rarity_common" },
  uncommon:  { weight: 25,  haloClass: "halo-uncommon",  nameKey: "rarity_uncommon" },
  rare:      { weight: 10,  haloClass: "halo-rare",      nameKey: "rarity_rare" },
  epic:      { weight: 4,   haloClass: "halo-epic",      nameKey: "rarity_epic" },
  legendary: { weight: 0.9, haloClass: "halo-legendary", nameKey: "rarity_legendary" },
  mythic:    { weight: 0.1, haloClass: "halo-mythic",    nameKey: "rarity_mythic" },
};

const DIFFICULTY_MODIFIERS = {
  easy:      {},
  medium:    { uncommon: 5, rare: 3 },
  hard:      { rare: 5, epic: 3, legendary: 0.5 },
  legendary: { epic: 8, legendary: 2, mythic: 0.3 },
};

export function rollRarity(difficulty, rng = Math.random) {
  const mods = DIFFICULTY_MODIFIERS[difficulty] || {};
  let total = 0;
  const adjusted = RARITY_TIERS.map(tier => {
    const w = RARITY_META[tier].weight + (mods[tier] || 0);
    total += w;
    return { tier, w };
  });
  let r = rng() * total;
  for (const entry of adjusted) {
    if (r < entry.w) return entry.tier;
    r -= entry.w;
  }
  return DEFAULT_RARITY;
}
