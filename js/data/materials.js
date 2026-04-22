export const MATERIALS = {
  bronze: {
    probability: 0.015,
    nameKey: "material_bronze",
    palette: {
      trunk: "--bronze-900",
      leaves: "--bronze-700",
      leavesMid: "--bronze-500",
      leavesHi: "--bronze-300",
      flowerA: "--bronze-500",
      flowerB: "--bronze-300",
    },
    shimmer: "gentle",
  },
  silver: {
    probability: 0.008,
    nameKey: "material_silver",
    palette: {
      trunk: "--silver-900",
      leaves: "--silver-500",
      leavesMid: "--silver-300",
      leavesHi: "--silver-100",
      flowerA: "--silver-100",
      flowerB: "--silver-500",
    },
    shimmer: "medium",
  },
  gold: {
    probability: 0.004,
    nameKey: "material_gold",
    palette: {
      trunk: "--gold-900",
      leaves: "--gold-700",
      leavesMid: "--gold-500",
      leavesHi: "--gold-300",
      flowerA: "--gold-300",
      flowerB: "--gold-700",
    },
    shimmer: "strong",
  },
  diamond: {
    probability: 0.001,
    nameKey: "material_diamond",
    palette: {
      trunk: "--diamond-500",
      leaves: "--diamond-300",
      leavesMid: "--diamond-100",
      leavesHi: "--diamond-hi",
      flowerA: "--diamond-hi",
      flowerB: "--diamond-300",
    },
    shimmer: "crystal",
  },
};

const MATERIAL_ORDER = ["diamond", "gold", "silver", "bronze"];

export function rollMaterial(rng = Math.random) {
  for (const id of MATERIAL_ORDER) {
    if (rng() < MATERIALS[id].probability) return id;
  }
  return null;
}

export function getMaterial(id) {
  return id ? MATERIALS[id] : null;
}
