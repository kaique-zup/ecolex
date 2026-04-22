import React from 'react';
import { getSpecies, DEFAULT_SPECIES_ID } from '../data/treeSpecies.js';

const h = React.createElement;

const v = (token) => `var(${token})`;

function renderTrunk(shape, palette, deadTrunk) {
  const trunkColor = deadTrunk ? v("--earth-900") : v(palette.trunk);
  const opacity = deadTrunk ? .75 : 1;

  const trunkPaths = {
    rounded:  { trunk: "M145,260 C142,230 148,200 146,170 C144,150 152,130 150,100", width: 10,
                branchL: "M148,150 C130,140 110,135 95,130", branchR: "M149,135 C170,120 190,115 210,110", branchTop: "M150,100 C160,85 148,70 155,55" },
    conic:    { trunk: "M148,260 C146,220 150,180 149,140 C148,110 151,80 150,45", width: 9,
                branchL: "M149,170 C135,165 122,163 112,160", branchR: "M150,155 C165,148 178,145 190,142", branchTop: "M150,100 C155,85 147,70 152,55" },
    umbrella: { trunk: "M145,260 C143,228 148,196 147,164 C146,140 150,120 150,108", width: 11,
                branchL: "M148,140 C120,130 95,125 75,118", branchR: "M150,130 C180,115 210,108 230,102", branchTop: "M150,108 C160,92 150,78 158,60" },
    slim:     { trunk: "M148,260 C147,225 149,190 148,155 C147,130 151,105 150,80", width: 6,
                branchL: "M148,150 C138,145 128,143 120,140", branchR: "M149,130 C160,122 172,118 182,114", branchTop: "M150,80 C156,65 148,50 154,38" },
    stout:    { trunk: "M140,260 C135,235 155,210 145,180 C135,155 160,130 150,110", width: 16,
                branchL: "M145,130 C120,125 100,125 82,128", branchR: "M152,128 C175,118 195,115 215,110", branchTop: "M150,110 C160,95 148,80 156,65" },
    tall:     { trunk: "M149,260 C148,220 151,180 149,140 C148,100 152,60 150,30", width: 8,
                branchL: "M149,150 C138,145 126,140 115,135", branchR: "M150,130 C163,122 176,115 188,108", branchTop: "M150,60 C158,45 148,30 155,15" },
  };
  const p = trunkPaths[shape] || trunkPaths.rounded;

  return [
    h("path", { key:"trunk", d: p.trunk, stroke: trunkColor, strokeWidth: p.width, strokeLinecap:"round", fill:"none", opacity }),
    h("path", { key:"branch-l", d: p.branchL, stroke: trunkColor, strokeWidth: 5, strokeLinecap:"round", fill:"none", opacity }),
    h("path", { key:"branch-r", d: p.branchR, stroke: trunkColor, strokeWidth: 5, strokeLinecap:"round", fill:"none", opacity }),
    h("path", { key:"branch-top", d: p.branchTop, stroke: trunkColor, strokeWidth: 4, strokeLinecap:"round", fill:"none", opacity }),
  ];
}

function renderFullCanopy(shape, palette) {
  const leaves = v(palette.leaves);
  const mid = v(palette.leavesMid);
  const hi = v(palette.leavesHi);

  if (shape === "conic") {
    return [
      h("path",{key:"c1",d:"M150,15 L95,90 L205,90 Z", fill: leaves, opacity:.95}),
      h("path",{key:"c2",d:"M150,50 L85,125 L215,125 Z", fill: mid, opacity:.9}),
      h("path",{key:"c3",d:"M150,80 L75,155 L225,155 Z", fill: leaves, opacity:.95}),
      h("ellipse",{key:"c4",cx:140,cy:110,rx:18,ry:10,fill: hi, opacity:.5}),
    ];
  }
  if (shape === "umbrella") {
    return [
      h("ellipse",{key:"c1",cx:150,cy:98,rx:100,ry:38,fill: leaves, opacity:.9}),
      h("ellipse",{key:"c2",cx:115,cy:95,rx:55,ry:28,fill: mid}),
      h("ellipse",{key:"c3",cx:190,cy:92,rx:60,ry:30,fill: mid}),
      h("ellipse",{key:"c4",cx:150,cy:80,rx:70,ry:22,fill: leaves}),
      h("ellipse",{key:"c5",cx:140,cy:88,rx:25,ry:10,fill: hi, opacity:.6}),
    ];
  }
  if (shape === "slim") {
    return [
      h("ellipse",{key:"c1",cx:150,cy:80,rx:45,ry:55,fill: leaves, opacity:.9}),
      h("ellipse",{key:"c2",cx:135,cy:95,rx:26,ry:32,fill: mid}),
      h("ellipse",{key:"c3",cx:165,cy:70,rx:24,ry:30,fill: leaves}),
      h("ellipse",{key:"c4",cx:145,cy:70,rx:16,ry:12,fill: hi, opacity:.55}),
    ];
  }
  if (shape === "stout") {
    return [
      h("ellipse",{key:"c1",cx:150,cy:95,rx:90,ry:55,fill: leaves, opacity:.9}),
      h("ellipse",{key:"c2",cx:105,cy:100,rx:45,ry:38,fill: mid}),
      h("ellipse",{key:"c3",cx:195,cy:95,rx:52,ry:40,fill: mid}),
      h("ellipse",{key:"c4",cx:150,cy:75,rx:55,ry:28,fill: leaves}),
      h("ellipse",{key:"c5",cx:130,cy:85,rx:28,ry:14,fill: hi, opacity:.55}),
    ];
  }
  if (shape === "tall") {
    return [
      h("ellipse",{key:"c1",cx:150,cy:55,rx:55,ry:42,fill: leaves, opacity:.9}),
      h("ellipse",{key:"c2",cx:130,cy:60,rx:32,ry:26,fill: mid}),
      h("ellipse",{key:"c3",cx:175,cy:50,rx:30,ry:24,fill: mid}),
      h("ellipse",{key:"c4",cx:150,cy:38,rx:40,ry:20,fill: leaves}),
      h("ellipse",{key:"c5",cx:140,cy:50,rx:18,ry:10,fill: hi, opacity:.5}),
    ];
  }
  return [
    h("ellipse",{key:"c1",cx:150,cy:90,rx:80,ry:70,fill: mid, opacity:.85}),
    h("ellipse",{key:"c2",cx:110,cy:95,rx:50,ry:45,fill: leaves}),
    h("ellipse",{key:"c3",cx:185,cy:85,rx:55,ry:50,fill: leaves}),
    h("ellipse",{key:"c4",cx:150,cy:60,rx:50,ry:40,fill: mid}),
    h("ellipse",{key:"c5",cx:130,cy:70,rx:28,ry:18,fill: hi, opacity:.6}),
    h("ellipse",{key:"c6",cx:185,cy:75,rx:20,ry:14,fill: hi, opacity:.5}),
  ];
}

function renderYellowCanopy(shape) {
  const base = shape === "conic"
    ? [
        h("path",{key:"y1",d:"M150,15 L95,90 L205,90 Z", fill:v("--sun-500"), opacity:.5}),
        h("path",{key:"y2",d:"M150,50 L85,125 L215,125 Z", fill:v("--sun-300")}),
        h("path",{key:"y3",d:"M150,80 L75,155 L225,155 Z", fill:v("--sun-500"), opacity:.6}),
      ]
    : [
        h("ellipse",{key:"y1",cx:150,cy:90,rx:78,ry:68,fill:v("--sun-500"),opacity:.5}),
        h("ellipse",{key:"y2",cx:110,cy:95,rx:48,ry:42,fill:v("--sun-300")}),
        h("ellipse",{key:"y3",cx:185,cy:85,rx:52,ry:48,fill:v("--moss-300")}),
        h("ellipse",{key:"y4",cx:150,cy:60,rx:48,ry:38,fill:v("--sun-500"),opacity:.7}),
        h("ellipse",{key:"y5",cx:130,cy:70,rx:24,ry:16,fill:v("--sun-100"),opacity:.7}),
      ];
  return base;
}

function renderSparseCanopy() {
  return [
    h("ellipse",{key:"s1",cx:115,cy:100,rx:34,ry:28,fill:v("--earth-300"),opacity:.9}),
    h("ellipse",{key:"s2",cx:185,cy:90,rx:38,ry:32,fill:v("--earth-500"),opacity:.8}),
    h("ellipse",{key:"s3",cx:155,cy:70,rx:28,ry:22,fill:v("--earth-300"),opacity:.7}),
    h("path",{key:"s4",d:"M100,120 q5,-3 8,2 q-3,4 -8,-2z", fill:v("--earth-500")}),
    h("path",{key:"s5",d:"M215,115 q5,-3 8,2 q-3,4 -8,-2z", fill:v("--earth-500")}),
  ];
}

function renderFlowers(palette) {
  const a = v(palette.flowerA);
  const b = v(palette.flowerB);
  return [
    h("circle",{key:"f1",cx:115,cy:70,r:4,fill: b}),
    h("circle",{key:"f1c",cx:115,cy:70,r:1.5,fill: a}),
    h("circle",{key:"f2",cx:175,cy:50,r:4,fill: a}),
    h("circle",{key:"f2c",cx:175,cy:50,r:1.5,fill: b}),
    h("circle",{key:"f3",cx:200,cy:90,r:4,fill: b}),
    h("circle",{key:"f3c",cx:200,cy:90,r:1.5,fill: a}),
    h("circle",{key:"f4",cx:140,cy:50,r:3.5,fill: a, opacity:.8}),
    h("circle",{key:"f4c",cx:140,cy:50,r:1.2,fill: b}),
    h("circle",{key:"f5",cx:220,cy:120,r:3.5,fill: b}),
  ];
}

export function TreeSVG({ stage, species = DEFAULT_SPECIES_ID, speciesName }) {
  const s = Math.min(stage, 6);
  const meta = getSpecies(species);
  const { palette, shape } = meta;

  const show = {
    fullCanopy: s <= 1,
    yellowCanopy: s === 2,
    sparseCanopy: s === 3,
    bareBranches: s >= 4,
    deadTrunk: s >= 6,
    flowers: s === 0,
    fallenPetals: s >= 1,
    fallenLeaves: s >= 3,
  };

  const ariaLabel = speciesName
    ? `Árvore (${speciesName}) em estágio ${s} de 6`
    : `Árvore em estágio ${s} de 6`;

  return h("svg",
    { viewBox: "0 0 300 300", role: "img", "aria-label": ariaLabel, xmlns:"http://www.w3.org/2000/svg" },
    [
      h("ellipse", { key:"ground", cx:150, cy:265, rx:110, ry:12, fill:v("--moss-100"), opacity:.7 }),
      h("ellipse", { key:"ground2", cx:150, cy:268, rx:80, ry:6, fill:v("--earth-300"), opacity:.4 }),

      show.fallenPetals && h("g", { key:"petals", opacity: .75 },
        h("circle",{cx:80,cy:262,r:2.2,fill:v(palette.flowerB)}),
        h("circle",{cx:105,cy:264,r:1.8,fill:v(palette.flowerA)}),
        h("circle",{cx:210,cy:263,r:2,fill:v(palette.flowerB)}),
        h("circle",{cx:225,cy:266,r:1.5,fill:v(palette.flowerA)}),
      ),
      show.fallenLeaves && h("g", { key:"leaves" },
        h("path",{d:"M60,260 q3,-2 5,1 q-2,2 -5,-1z", fill:v("--earth-500"), opacity:.7}),
        h("path",{d:"M240,263 q3,-2 5,1 q-2,2 -5,-1z", fill:v("--earth-500"), opacity:.7}),
        h("path",{d:"M120,267 q3,-2 5,1 q-2,2 -5,-1z", fill:v("--earth-300"), opacity:.7}),
      ),

      ...renderTrunk(shape, palette, show.deadTrunk),

      h("g", { key:"canopy-full", className:"tree-layer", style:{ opacity: show.fullCanopy ? 1 : 0 } },
        renderFullCanopy(shape, palette)),

      show.flowers && h("g", { key:"flowers", className:"tree-layer" },
        renderFlowers(palette)),

      h("g", { key:"canopy-yellow", className:"tree-layer", style:{ opacity: show.yellowCanopy ? 1 : 0 } },
        renderYellowCanopy(shape)),

      h("g", { key:"canopy-sparse", className:"tree-layer", style:{ opacity: show.sparseCanopy ? 1 : 0 } },
        renderSparseCanopy()),

      show.bareBranches && h("g", { key:"bare-extras" },
        h("path",{d:"M95,130 C85,120 75,115 70,100", stroke:v("--earth-700"), strokeWidth:2, strokeLinecap:"round", fill:"none", opacity:.8}),
        h("path",{d:"M210,110 C220,95 230,90 238,78", stroke:v("--earth-700"), strokeWidth:2, strokeLinecap:"round", fill:"none", opacity:.8}),
        h("path",{d:"M155,55 C160,40 152,28 158,20", stroke:v("--earth-700"), strokeWidth:2, strokeLinecap:"round", fill:"none", opacity:.8}),
      ),

      show.deadTrunk && h("path", {
        key:"crack",
        d: "M148,170 L145,200 L149,230 L146,258",
        stroke:v("--ink"), strokeWidth:1.2, fill:"none", opacity:.6
      }),
    ].filter(Boolean)
  );
}
