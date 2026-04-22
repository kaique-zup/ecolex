import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '../store.js';
import { t } from '../i18n.js';
import { normalize, computeRevealed, POWERUP_META } from '../utils.js';
import { pickSpeciesForWord } from '../species.js';
import { getSpecies } from '../data/treeSpecies.js';
import { Topbar } from './Topbar.js';
import { TreeSVG } from './TreeSVG.js';

const h = React.createElement;

export function PlayView() {
  const { state, dispatch, prefs } = useStore();
  const L = prefs.uiLang;
  const [hintOpen, setHintOpen] = useState(false);

  const word = state.word;
  const letters = normalize(word.languages[state.wordLang].word).split("");
  const revealed = computeRevealed(state);
  const hint = word.languages[state.hintLang].hint;
  const treeStage = Math.min(state.missCount, 6);
  const species = useMemo(() => pickSpeciesForWord(word, state.wordLang), [word && word.id, state.wordLang]);
  const speciesName = t(L, getSpecies(species).nameKey);

  useEffect(() => { setHintOpen(false); }, [word && word.id]);

  const handleGuess = (letter) => dispatch({ type:"GUESS_LETTER", payload:{ letter }});
  const handlePower = () => dispatch({ type:"ACTIVATE_POWERUP" });
  const handleResign = () => dispatch({ type:"RESIGN" });

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toUpperCase();
      if (k.length === 1 && k >= "A" && k <= "Z") {
        e.preventDefault();
        handleGuess(k);
      }
      if (e.key === "Enter" && state.powerup.kind && !state.powerup.used) {
        e.preventDefault();
        handlePower();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state]);

  const powerupKind = state.powerup.kind;
  const powerupMeta = powerupKind ? POWERUP_META[powerupKind] : null;
  const shieldActive = state.powerup.activeEffect === "shield";
  const hearts = Array.from({length:6}, (_,i) => i < 6 - state.missCount);

  const treePanel = h("aside", { className:"play-tree", "aria-label": L==="pt"?"Árvore":"Tree" }, [
    h("div",{key:"s",className:"stage stage-enter"},
      h(TreeSVG, { stage: treeStage, species, speciesName })),
    h("div", { key:"l", className:"lives" }, [
      ...hearts.map((alive,i) => h("span",{key:i,className:`heart${alive?"":" lost"}`})),
      h("span",{key:"txt",style:{marginLeft:"8px"}}, t(L,"lives_left", 6 - state.missCount)),
    ]),
  ]);

  const wordPanel = h("main", { className:"play-main" }, [
    h("div", { key:"word", className:"word-row word-row-lg", role:"group", "aria-label": L==="pt"?"Palavra":"Word" },
      letters.map((ltr, i) =>
        ltr === " " ?
          h("span",{key:i, className:"slot space"}) :
          h("span", {
            key: i,
            className: `slot${revealed[i]?" revealed":""}`,
            "aria-label": revealed[i] ? `${L==="pt"?"Letra":"Letter"} ${ltr}` : (L==="pt"?"Letra oculta":"Hidden letter"),
          }, revealed[i] ? ltr : "")
      )
    ),

    h("div", { key:"htoggle", className:"hint-toggle-row" }, [
      h("button", {
        key:"tg",
        className: `hint-toggle${hintOpen?" open":""}`,
        "aria-expanded": hintOpen,
        "aria-controls": "hint-panel",
        onClick: () => setHintOpen(v => !v),
      }, [
        h("span",{key:"i",className:"hint-ico"},
          h("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"}, [
            h("circle",{key:"c",cx:12,cy:12,r:9}),
            h("path",{key:"d",d:"M12 17v.01"}),
            h("path",{key:"q",d:"M12 13a2 2 0 1 0-2-2"}),
          ])
        ),
        h("span",{key:"t"}, hintOpen ? t(L,"hide_hint") : t(L,"show_hint")),
        h("span",{key:"lt",className:"hint-toggle-lang"}, state.hintLang.toUpperCase()),
      ]),
    ]),
    hintOpen && h("div", { key:"hint", id:"hint-panel", className:"hint-bar" }, [
      h("span", { key:"tag", className:"hint-tag" }, `${state.hintLang.toUpperCase()} · ${t(L,"hint")}`),
      h("span", { key:"text", className:"hint-text" }, hint),
    ]),

    powerupKind && h("div", { key:"pu", className:"powerup-island" }, [
      h("button", {
        key:"btn",
        className: `powerup-btn ${powerupKind}${shieldActive && powerupKind==="sun"?" active-indicator":""}`,
        onClick: handlePower,
        disabled: state.powerup.used,
        "aria-label": t(L, powerupMeta.nameKey) + " — " + t(L, powerupMeta.descKey),
      }, powerupMeta.icon),
      h("div", { key:"meta", className:"powerup-meta" }, [
        h("div",{key:"n",className:"powerup-name"}, t(L, powerupMeta.nameKey)),
        h("div",{key:"d",className:"powerup-desc"},
          state.powerup.used ? t(L,"powerup_used") : t(L, powerupMeta.descKey)),
      ]),
      shieldActive && h("span",{key:"s",className:"shield-badge"}, ["✦ ", t(L,"shield_on")]),
    ]),

    h("div", { key:"kb", className:"keyboard", role:"group", "aria-label": t(L,"keyboard_label")},
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => {
        const guessed = state.guessed.includes(letter);
        const hit = guessed && letters.includes(letter);
        const miss = guessed && !letters.includes(letter);
        return h("button", {
          key: letter,
          className: `key${hit?" hit":""}${miss?" miss":""}`,
          disabled: guessed || state.phase !== "playing",
          onClick: () => handleGuess(letter),
          "aria-label": `${L==="pt"?"Letra":"Letter"} ${letter}${guessed ? (hit ? " — "+(L==="pt"?"acerto":"hit"):" — "+(L==="pt"?"erro":"miss")):""}`,
        }, letter);
      })
    ),

    h("div", { key:"resign", style:{marginTop:"16px", textAlign:"center"} },
      h("button",{className:"btn btn-danger", style:{minHeight:"38px", fontSize:"13px"}, onClick: handleResign}, t(L,"resign"))
    ),
  ].filter(Boolean));

  return h(React.Fragment, null, [
    h(Topbar, { key:"top" }),
    h("div", { key:"play", className:"play-grid" }, [
      h(React.Fragment, { key:"t" }, treePanel),
      h(React.Fragment, { key:"w" }, wordPanel),
    ]),
  ]);
}
