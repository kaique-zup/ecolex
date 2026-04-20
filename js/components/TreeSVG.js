import React from 'react';

const h = React.createElement;

export function TreeSVG({ stage }) {
  const s = Math.min(stage, 6);

  const show = {
    trunk: true,
    fullCanopy: s <= 1,
    yellowCanopy: s === 2,
    sparseCanopy: s === 3,
    bareBranches: s >= 4,
    deadTrunk: s >= 6,
    flowers: s === 0,
    fallenPetals: s >= 1,
    fallenLeaves: s >= 3,
  };

  return h("svg",
    { viewBox: "0 0 300 300", role: "img", "aria-label": `Árvore em estágio ${s} de 6`, xmlns:"http://www.w3.org/2000/svg" },
    [
      h("ellipse", { key:"ground", cx:150, cy:265, rx:110, ry:12, fill:"var(--moss-100)", opacity:.7 }),
      h("ellipse", { key:"ground2", cx:150, cy:268, rx:80, ry:6, fill:"var(--earth-300)", opacity:.4 }),

      show.fallenPetals && h("g", { key:"petals", opacity: .75 },
        h("circle",{cx:80,cy:262,r:2.2,fill:"var(--terra-300)"}),
        h("circle",{cx:105,cy:264,r:1.8,fill:"var(--sun-500)"}),
        h("circle",{cx:210,cy:263,r:2,fill:"var(--terra-300)"}),
        h("circle",{cx:225,cy:266,r:1.5,fill:"var(--sun-300)"}),
      ),
      show.fallenLeaves && h("g", { key:"leaves" },
        h("path",{d:"M60,260 q3,-2 5,1 q-2,2 -5,-1z", fill:"var(--earth-500)", opacity:.7}),
        h("path",{d:"M240,263 q3,-2 5,1 q-2,2 -5,-1z", fill:"var(--earth-500)", opacity:.7}),
        h("path",{d:"M120,267 q3,-2 5,1 q-2,2 -5,-1z", fill:"var(--earth-300)", opacity:.7}),
      ),

      h("path", {
        key:"trunk",
        d:"M145,260 C142,230 148,200 146,170 C144,150 152,130 150,100",
        stroke: show.deadTrunk ? "var(--earth-900)" : "var(--earth-700)",
        strokeWidth: 10,
        strokeLinecap:"round",
        fill:"none",
        opacity: show.deadTrunk ? .75 : 1,
      }),
      h("path", {
        key:"branch-l",
        d:"M148,150 C130,140 110,135 95,130",
        stroke: show.deadTrunk ? "var(--earth-900)" : "var(--earth-700)",
        strokeWidth: 5, strokeLinecap:"round", fill:"none",
        opacity: show.deadTrunk ? .75 : 1,
      }),
      h("path", {
        key:"branch-r",
        d:"M149,135 C170,120 190,115 210,110",
        stroke: show.deadTrunk ? "var(--earth-900)" : "var(--earth-700)",
        strokeWidth: 5, strokeLinecap:"round", fill:"none",
        opacity: show.deadTrunk ? .75 : 1,
      }),
      h("path", {
        key:"branch-top",
        d:"M150,100 C160,85 148,70 155,55",
        stroke: show.deadTrunk ? "var(--earth-900)" : "var(--earth-700)",
        strokeWidth: 4, strokeLinecap:"round", fill:"none",
        opacity: show.deadTrunk ? .75 : 1,
      }),

      h("g", { key:"canopy-full", className:"tree-layer", style:{ opacity: show.fullCanopy ? 1 : 0 } },
        h("ellipse",{cx:150,cy:90,rx:80,ry:70,fill:"var(--moss-500)",opacity:.85}),
        h("ellipse",{cx:110,cy:95,rx:50,ry:45,fill:"var(--moss-700)"}),
        h("ellipse",{cx:185,cy:85,rx:55,ry:50,fill:"var(--moss-700)"}),
        h("ellipse",{cx:150,cy:60,rx:50,ry:40,fill:"var(--moss-500)"}),
        h("ellipse",{cx:130,cy:70,rx:28,ry:18,fill:"var(--moss-300)",opacity:.6}),
        h("ellipse",{cx:185,cy:75,rx:20,ry:14,fill:"var(--moss-300)",opacity:.5}),
      ),
      show.flowers && h("g", { key:"flowers", className:"tree-layer" },
        h("circle",{cx:115,cy:70,r:4,fill:"var(--terra-300)"}),
        h("circle",{cx:115,cy:70,r:1.5,fill:"var(--sun-500)"}),
        h("circle",{cx:175,cy:50,r:4,fill:"var(--sun-300)"}),
        h("circle",{cx:175,cy:50,r:1.5,fill:"var(--terra-500)"}),
        h("circle",{cx:200,cy:90,r:4,fill:"var(--terra-300)"}),
        h("circle",{cx:200,cy:90,r:1.5,fill:"var(--sun-500)"}),
        h("circle",{cx:140,cy:50,r:3.5,fill:"var(--sun-100)"}),
        h("circle",{cx:140,cy:50,r:1.2,fill:"var(--terra-500)"}),
        h("circle",{cx:220,cy:120,r:3.5,fill:"var(--terra-300)"}),
      ),

      h("g", { key:"canopy-yellow", className:"tree-layer", style:{ opacity: show.yellowCanopy ? 1 : 0 } },
        h("ellipse",{cx:150,cy:90,rx:78,ry:68,fill:"var(--sun-500)",opacity:.5}),
        h("ellipse",{cx:110,cy:95,rx:48,ry:42,fill:"var(--sun-300)"}),
        h("ellipse",{cx:185,cy:85,rx:52,ry:48,fill:"var(--moss-300)"}),
        h("ellipse",{cx:150,cy:60,rx:48,ry:38,fill:"var(--sun-500)",opacity:.7}),
        h("ellipse",{cx:130,cy:70,rx:24,ry:16,fill:"var(--sun-100)",opacity:.7}),
      ),

      h("g", { key:"canopy-sparse", className:"tree-layer", style:{ opacity: show.sparseCanopy ? 1 : 0 } },
        h("ellipse",{cx:115,cy:100,rx:34,ry:28,fill:"var(--earth-300)",opacity:.9}),
        h("ellipse",{cx:185,cy:90,rx:38,ry:32,fill:"var(--earth-500)",opacity:.8}),
        h("ellipse",{cx:155,cy:70,rx:28,ry:22,fill:"var(--earth-300)",opacity:.7}),
        h("path",{d:"M100,120 q5,-3 8,2 q-3,4 -8,-2z", fill:"var(--earth-500)"}),
        h("path",{d:"M215,115 q5,-3 8,2 q-3,4 -8,-2z", fill:"var(--earth-500)"}),
      ),

      show.bareBranches && h("g", { key:"bare-extras" },
        h("path",{d:"M95,130 C85,120 75,115 70,100", stroke:"var(--earth-700)", strokeWidth:2, strokeLinecap:"round", fill:"none", opacity:.8}),
        h("path",{d:"M210,110 C220,95 230,90 238,78", stroke:"var(--earth-700)", strokeWidth:2, strokeLinecap:"round", fill:"none", opacity:.8}),
        h("path",{d:"M155,55 C160,40 152,28 158,20", stroke:"var(--earth-700)", strokeWidth:2, strokeLinecap:"round", fill:"none", opacity:.8}),
      ),

      show.deadTrunk && h("path", {
        key:"crack",
        d: "M148,170 L145,200 L149,230 L146,258",
        stroke:"var(--ink)", strokeWidth:1.2, fill:"none", opacity:.6
      }),
    ].filter(Boolean)
  );
}
