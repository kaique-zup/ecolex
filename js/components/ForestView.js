import React from 'react';
import { useStore } from '../store.js';
import { t } from '../i18n.js';
import { getSpecies, DEFAULT_SPECIES_ID } from '../data/treeSpecies.js';
import { Topbar } from './Topbar.js';

const h = React.createElement;

const v = (token) => `var(${token})`;

function renderMiniTree(shape, palette) {
  const leaves = v(palette.leaves);
  const mid = v(palette.leavesMid);
  const hi = v(palette.leavesHi);
  const flowerA = v(palette.flowerA);
  const flowerB = v(palette.flowerB);
  const trunk = v(palette.trunk);

  if (shape === "conic") {
    return [
      h("path",{key:"t",d:"M30,55 L30,22", stroke:trunk, strokeWidth:2.5, fill:"none", strokeLinecap:"round"}),
      h("path",{key:"c1",d:"M30,4 L16,24 L44,24 Z", fill:leaves}),
      h("path",{key:"c2",d:"M30,14 L13,32 L47,32 Z", fill:mid}),
      h("path",{key:"c3",d:"M30,22 L11,42 L49,42 Z", fill:leaves}),
      h("circle",{key:"f1",cx:24,cy:30,r:1.2,fill:flowerA}),
      h("circle",{key:"f2",cx:36,cy:36,r:1.2,fill:flowerB}),
    ];
  }
  if (shape === "umbrella") {
    return [
      h("path",{key:"t",d:"M30,55 C28,44 32,32 30,22", stroke:trunk, strokeWidth:2.2, fill:"none", strokeLinecap:"round"}),
      h("ellipse",{key:"c1",cx:30,cy:18,rx:20,ry:8,fill:leaves}),
      h("ellipse",{key:"c2",cx:22,cy:18,rx:10,ry:6,fill:mid}),
      h("ellipse",{key:"c3",cx:38,cy:16,rx:12,ry:6,fill:mid}),
      h("ellipse",{key:"c4",cx:30,cy:12,rx:14,ry:4,fill:hi,opacity:.6}),
      h("circle",{key:"f1",cx:24,cy:16,r:1.2,fill:flowerA}),
      h("circle",{key:"f2",cx:36,cy:20,r:1.2,fill:flowerB}),
    ];
  }
  if (shape === "slim") {
    return [
      h("path",{key:"t",d:"M30,55 C29,42 31,30 30,20", stroke:trunk, strokeWidth:1.4, fill:"none", strokeLinecap:"round"}),
      h("ellipse",{key:"c1",cx:30,cy:16,rx:9,ry:14,fill:leaves}),
      h("ellipse",{key:"c2",cx:27,cy:22,rx:5,ry:8,fill:mid}),
      h("ellipse",{key:"c3",cx:33,cy:12,rx:5,ry:7,fill:hi,opacity:.6}),
      h("circle",{key:"f1",cx:30,cy:14,r:1,fill:flowerA}),
    ];
  }
  if (shape === "stout") {
    return [
      h("path",{key:"t",d:"M30,55 C26,46 34,36 30,24", stroke:trunk, strokeWidth:3.2, fill:"none", strokeLinecap:"round"}),
      h("circle",{key:"c1",cx:30,cy:18,r:15,fill:leaves}),
      h("circle",{key:"c2",cx:22,cy:20,r:9,fill:mid}),
      h("circle",{key:"c3",cx:36,cy:16,r:8,fill:hi,opacity:.7}),
      h("circle",{key:"f1",cx:24,cy:18,r:1.3,fill:flowerA}),
      h("circle",{key:"f2",cx:36,cy:22,r:1.3,fill:flowerB}),
    ];
  }
  if (shape === "tall") {
    return [
      h("path",{key:"t",d:"M30,55 C29,42 31,28 30,12", stroke:trunk, strokeWidth:1.8, fill:"none", strokeLinecap:"round"}),
      h("ellipse",{key:"c1",cx:30,cy:10,rx:12,ry:10,fill:leaves}),
      h("ellipse",{key:"c2",cx:26,cy:12,rx:7,ry:6,fill:mid}),
      h("ellipse",{key:"c3",cx:34,cy:8,rx:6,ry:5,fill:hi,opacity:.6}),
      h("circle",{key:"f1",cx:30,cy:10,r:1,fill:flowerA}),
    ];
  }
  return [
    h("path",{key:"t",d:"M30,55 C28,45 32,35 30,22", stroke:trunk, strokeWidth:2, fill:"none", strokeLinecap:"round"}),
    h("circle",{key:"c1",cx:30,cy:18,r:14,fill:leaves}),
    h("circle",{key:"c2",cx:24,cy:20,r:8,fill:mid}),
    h("circle",{key:"c3",cx:35,cy:15,r:7,fill:hi,opacity:.75}),
    h("circle",{key:"f1",cx:23,cy:16,r:1.4,fill:flowerA}),
    h("circle",{key:"f2",cx:35,cy:22,r:1.4,fill:flowerB}),
  ];
}

export function ForestView() {
  const { persisted, prefs } = useStore();
  const L = prefs.uiLang;
  const totalWins = persisted.stats.wins;

  const storedForest = persisted.forest || [];
  const padCount = Math.max(0, totalWins - storedForest.length);
  const pad = Array.from({ length: padCount }, () => ({ speciesId: DEFAULT_SPECIES_ID }));
  const entries = [...pad, ...storedForest].slice(-60);

  return h(React.Fragment, null, [
    h(Topbar, { key:"top" }),

    h("div", { key:"hero", className:"card" }, [
      h("div",{key:"eye",className:"eyebrow"}, t(L,"forest_tab")),
      h("div", { key:"r", className:"streak-hero", style:{marginTop:"6px"} }, [
        h("span",{key:"b",className:"streak-big"}, persisted.streak),
        h("span",{key:"l",className:"streak-label"}, t(L,"streak")),
      ]),
      h("div", { key:"stats", className:"stat-row" }, [
        h("div",{key:"b",className:"stat-cell"},[
          h("div",{key:"n",className:"stat-num"}, persisted.bestStreak),
          h("div",{key:"l",className:"stat-lbl"}, t(L,"best")),
        ]),
        h("div",{key:"w",className:"stat-cell"},[
          h("div",{key:"n",className:"stat-num"}, persisted.stats.wins),
          h("div",{key:"l",className:"stat-lbl"}, t(L,"wins")),
        ]),
        h("div",{key:"ls",className:"stat-cell"},[
          h("div",{key:"n",className:"stat-num"}, persisted.stats.losses),
          h("div",{key:"l",className:"stat-lbl"}, t(L,"losses")),
        ]),
      ]),
    ]),

    h("div", { key:"grid", className:"card" },
      entries.length === 0
        ? h("div",{className:"forest-empty-state"},
            t(L,"forest_empty").split("\n").map((line,i) =>
              h(React.Fragment,{key:i},[line,i===0 && h("br",{key:"b"})])))
        : h("div", { className:"forest-grid" },
            entries.map((entry, i) => {
              const meta = getSpecies(entry.speciesId);
              const name = t(L, meta.nameKey);
              const tooltip = t(L, "species_tooltip", name);
              return h("div", {
                key: i,
                className: "forest-slot",
                style: { animationDelay: `${Math.min(i*30,900)}ms` },
                title: tooltip,
                "aria-label": tooltip,
              },
                h("svg",{width:"100%",viewBox:"0 0 60 60"},
                  h("g",null, renderMiniTree(meta.shape, meta.palette))
                )
              );
            })
          )
    ),
  ]);
}
