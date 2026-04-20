import React from 'react';
import { useStore } from '../store.js';
import { t } from '../i18n.js';
import { Topbar } from './Topbar.js';
import { TreeSVG } from './TreeSVG.js';

const h = React.createElement;

export function Onboarding() {
  const { persisted, setPersisted, prefs } = useStore();
  const L = prefs.uiLang;
  const handleStart = () => {
    setPersisted({ ...persisted, onboarded: true });
  };
  return h("div", { className:"shell" }, [
    h(Topbar, { key:"top", minimal:true }),
    h("div", { key:"ob", className:"onboarding" }, [
      h("div", { key:"tree", className:"onboarding-tree" }, h(TreeSVG, { stage: 0 })),
      h("h1", { key:"h" }, [
        t(L, "welcome_title").split("\n")[0], h("br",{key:"br"}),
        h("em",{key:"em"}, t(L, "welcome_title").split("\n")[1]),
      ]),
      h("p", { key:"tag", className:"tagline" }, t(L, "welcome_lede")),
      h("button", { key:"btn", className:"btn btn-primary", onClick: handleStart },
        [t(L, "begin"), h("span",{key:"a",style:{fontSize:"18px"}},"→")]),
    ]),
  ]);
}
