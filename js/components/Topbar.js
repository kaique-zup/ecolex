import React from 'react';
import { useStore } from '../store.js';

const h = React.createElement;

export function Topbar({ minimal }) {
  const { prefs, setUiLang } = useStore();
  const L = prefs.uiLang;
  return h("div", { className: "topbar" }, [
    h("div", { key:"brand", className:"brand" }, [
      h("span",{key:"d",className:"brand-dot"}),
      h("span",{key:"n"}, "EcoLex"),
    ]),
    !minimal && h("div", { key:"act", className:"top-actions" }, [
      h("button", {
        key:"lang",
        className:"icon-btn",
        "aria-label": L==="pt" ? "Mudar interface para inglês" : "Switch UI to Portuguese",
        onClick: () => setUiLang(L==="pt" ? "en" : "pt"),
        title: L==="pt" ? "PT · EN" : "EN · PT",
      },
        h("span",{style:{fontSize:"11px",fontWeight:700,letterSpacing:".08em"}}, L.toUpperCase()),
      ),
    ]),
  ].filter(Boolean));
}
