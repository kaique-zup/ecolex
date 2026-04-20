import React from 'react';
import { useStore } from '../store.js';
import { t } from '../i18n.js';
import { Topbar } from './Topbar.js';

const h = React.createElement;

export function ForestView() {
  const { persisted, prefs } = useStore();
  const L = prefs.uiLang;
  const totalWins = persisted.stats.wins;

  const count = Math.min(totalWins, 60);
  const trees = Array.from({length: count}, (_,i) => i);

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
      trees.length === 0
        ? h("div",{className:"forest-empty-state"},
            t(L,"forest_empty").split("\n").map((line,i) =>
              h(React.Fragment,{key:i},[line,i===0 && h("br",{key:"b"})])))
        : h("div", { className:"forest-grid" },
            trees.map(i => h("div",{key:i,className:"forest-slot",style:{animationDelay:`${Math.min(i*30,900)}ms`}},
              h("svg",{width:"100%",viewBox:"0 0 60 60"},
                h("g",null,[
                  h("path",{key:"t",d:"M30,55 C28,45 32,35 30,22", stroke:"var(--earth-700)", strokeWidth:2, fill:"none", strokeLinecap:"round"}),
                  h("circle",{key:"c1",cx:30,cy:18,r:14,fill:"var(--moss-700)"}),
                  h("circle",{key:"c2",cx:24,cy:20,r:8,fill:"var(--moss-500)"}),
                  h("circle",{key:"c3",cx:35,cy:15,r:7,fill:"var(--moss-300)",opacity:.75}),
                  h("circle",{key:"f1",cx:23,cy:16,r:1.4,fill:"var(--sun-500)"}),
                  h("circle",{key:"f2",cx:35,cy:22,r:1.4,fill:"var(--terra-300)"}),
                ])
              )
            ))
          )
    ),
  ]);
}
