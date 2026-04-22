export const DEFAULT_SPECIES_ID = "default";

export const TREE_SPECIES = {
  default: {
    difficulty: null,
    nameKey: "species_default_name",
    palette: {
      trunk: "--earth-700",
      leaves: "--moss-700",
      leavesMid: "--moss-500",
      leavesHi: "--moss-300",
      flowerA: "--sun-500",
      flowerB: "--terra-300",
    },
    shape: "rounded",
  },
  eucalipto: {
    difficulty: "easy",
    nameKey: "species_eucalipto_name",
    palette: {
      trunk: "--earth-500",
      leaves: "--moss-500",
      leavesMid: "--moss-300",
      leavesHi: "--moss-100",
      flowerA: "--sun-100",
      flowerB: "--moss-300",
    },
    shape: "slim",
  },
  pinheiro: {
    difficulty: "easy",
    nameKey: "species_pinheiro_name",
    palette: {
      trunk: "--earth-700",
      leaves: "--moss-700",
      leavesMid: "--moss-500",
      leavesHi: "--moss-500",
      flowerA: "--moss-300",
      flowerB: "--moss-300",
    },
    shape: "conic",
  },
  ipe: {
    difficulty: "medium",
    nameKey: "species_ipe_name",
    palette: {
      trunk: "--earth-700",
      leaves: "--sun-500",
      leavesMid: "--sun-300",
      leavesHi: "--sun-100",
      flowerA: "--sun-500",
      flowerB: "--sun-300",
    },
    shape: "rounded",
  },
  cedro: {
    difficulty: "medium",
    nameKey: "species_cedro_name",
    palette: {
      trunk: "--earth-900",
      leaves: "--moss-700",
      leavesMid: "--moss-500",
      leavesHi: "--moss-300",
      flowerA: "--earth-300",
      flowerB: "--moss-500",
    },
    shape: "conic",
  },
  araucaria: {
    difficulty: "medium",
    nameKey: "species_araucaria_name",
    palette: {
      trunk: "--earth-900",
      leaves: "--moss-900",
      leavesMid: "--moss-700",
      leavesHi: "--moss-500",
      flowerA: "--earth-500",
      flowerB: "--moss-500",
    },
    shape: "umbrella",
  },
  baoba: {
    difficulty: "hard",
    nameKey: "species_baoba_name",
    palette: {
      trunk: "--terra-700",
      leaves: "--moss-500",
      leavesMid: "--moss-300",
      leavesHi: "--earth-300",
      flowerA: "--terra-500",
      flowerB: "--earth-300",
    },
    shape: "stout",
  },
  sequoia: {
    difficulty: "hard",
    nameKey: "species_sequoia_name",
    palette: {
      trunk: "--terra-700",
      leaves: "--moss-900",
      leavesMid: "--moss-700",
      leavesHi: "--moss-500",
      flowerA: "--terra-500",
      flowerB: "--moss-700",
    },
    shape: "tall",
  },
  jequitiba: {
    difficulty: "hard",
    nameKey: "species_jequitiba_name",
    palette: {
      trunk: "--earth-700",
      leaves: "--moss-700",
      leavesMid: "--moss-500",
      leavesHi: "--sun-300",
      flowerA: "--sun-500",
      flowerB: "--moss-300",
    },
    shape: "rounded",
  },
  dragoeiro: {
    difficulty: "legendary",
    nameKey: "species_dragoeiro_name",
    palette: {
      trunk: "--terra-700",
      leaves: "--moss-700",
      leavesMid: "--terra-500",
      leavesHi: "--sun-500",
      flowerA: "--terra-700",
      flowerB: "--sun-500",
    },
    shape: "umbrella",
  },
  pau_brasil: {
    difficulty: "legendary",
    nameKey: "species_pau_brasil_name",
    palette: {
      trunk: "--terra-700",
      leaves: "--terra-500",
      leavesMid: "--terra-300",
      leavesHi: "--sun-500",
      flowerA: "--terra-700",
      flowerB: "--sun-300",
    },
    shape: "rounded",
  },
};

export function getSpecies(id) {
  return TREE_SPECIES[id] || TREE_SPECIES[DEFAULT_SPECIES_ID];
}

export function speciesByDifficulty(diff) {
  return Object.entries(TREE_SPECIES)
    .filter(([, meta]) => meta.difficulty === diff)
    .map(([id]) => id);
}
