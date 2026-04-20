import React from 'react';
import { useStore } from '../store.js';
import { t } from '../i18n.js';

const h = React.createElement;

export function TabBar() {
  const { tab, setTab, prefs } = useStore();
  const L = prefs.uiLang;
  const tabs = [
    { id:"play",   label: t(L,"play_tab"),   icon:"🌱" },
    { id:"forest", label: t(L,"forest_tab"), icon:"🌳" },
    { id:"gloss",  label: t(L,"gloss_tab"),  icon:"📖" },
  ];
  return h("nav", { className:"tabs", "aria-label":"Principal" },
    tabs.map(t0 => h("button", {
      key: t0.id,
      className: "tab",
      "aria-current": tab === t0.id ? "page" : undefined,
      onClick: () => setTab(t0.id),
    }, [h("span",{key:"i",style:{fontSize:"15px"}}, t0.icon), h("span",{key:"t"}, t0.label)]))
  );
}
