export function pickWord(pool, playedIds) {
  const available = pool.filter(w => !playedIds.includes(w.id));
  const set = available.length > 0 ? available : pool;
  return set[Math.floor(Math.random() * set.length)];
}

export const POWERUP_KINDS = ["rain", "sun", "compost"];

export function pickPowerup() {
  let r;
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    r = buf[0] / 0x100000000;
  } else {
    r = Math.random();
  }
  return POWERUP_KINDS[Math.floor(r * POWERUP_KINDS.length)];
}

export const POWERUP_META = {
  rain:    { icon:"💧", nameKey:"powerup_rain",   descKey:"powerup_rain_desc" },
  sun:     { icon:"☀",  nameKey:"powerup_sun",    descKey:"powerup_sun_desc" },
  compost: { icon:"🍃", nameKey:"powerup_compost",descKey:"powerup_compost_desc" },
};

export function normalize(str) {
  return (str || "").toUpperCase();
}

export function computeRevealed(state) {
  if (!state.word) return [];
  const letters = normalize(state.word.languages[state.wordLang].word).split("");
  return letters.map(l => l === " " || state.guessed.includes(l));
}
