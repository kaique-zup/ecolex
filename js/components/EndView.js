import React, { useEffect, useRef } from 'react';
import { useStore } from '../store.js';
import { t } from '../i18n.js';
import { useSpeech } from '../hooks.js';
import { WORDS } from '../data/words.js';
import { Topbar } from './Topbar.js';
import { TreeSVG } from './TreeSVG.js';

const h = React.createElement;

export function EndView() {
  const { state, dispatch, prefs, persisted, setPersisted } = useStore();
  const L = prefs.uiLang;
  const speak = useSpeech();

  const win = state.phase === "victory";
  const word = state.word;
  const ptWord = word.languages.pt.word;
  const enWord = word.languages.en.word;
  const wordInWordLang = word.languages[state.wordLang].word;
  const wordInHintLang = word.languages[state.hintLang].word;

  const committedRef = useRef(false);
  useEffect(() => {
    if (committedRef.current) return;
    committedRef.current = true;
    const next = { ...persisted };
    next.glossary = [
      { id: word.id, result: win?"win":"loss", misses: state.missCount, at: Date.now() },
      ...persisted.glossary.filter(g => g.id !== word.id),
    ].slice(0, 500);
    next.playedIds = [...new Set([...persisted.playedIds, word.id])];
    const pool = state.category === "all" ? WORDS : WORDS.filter(w => w.category === state.category);
    if (next.playedIds.length >= pool.length) next.playedIds = [word.id];
    if (win) {
      next.streak = persisted.streak + 1;
      next.bestStreak = Math.max(persisted.bestStreak, next.streak);
      next.stats = {
        ...persisted.stats,
        wins: persisted.stats.wins + 1,
        byCategory: { ...persisted.stats.byCategory, [word.category]: (persisted.stats.byCategory[word.category]||0) + 1 },
      };
    } else {
      next.streak = 0;
      next.stats = { ...persisted.stats, losses: persisted.stats.losses + 1 };
    }
    setPersisted(next);
  }, []);

  const next = () => dispatch({ type:"RESET_TO_SETUP" });

  return h(React.Fragment, null, [
    h(Topbar, { key:"top" }),
    h("div", { key:"card", className:"card", style:{padding:"28px 24px", textAlign:"center"} }, [
      h("div",{key:"stg",className:"stage",style:{maxHeight:"28vh",maxWidth:"28vh",margin:"0 auto"}},
        h(TreeSVG, { stage: win ? 0 : 6 })),

      h("div", { key:"hero", className:"end-hero" }, [
        h("div", { key:"eye", className:"eyebrow" }, win ? "✦" : "◦"),
        h("h2", { key:"h", className:`end-title ${win?"win":"loss"}`, style:{marginTop:"6px"} },
          win ? t(L,"victory") : t(L,"defeat")),
        h("p", { key:"s", style:{marginTop:"8px"}}, win ? t(L,"victory_sub") : t(L,"defeat_sub")),
      ]),

      h("div", { key:"divider", className:"divider" }, [
        h("svg",{key:"s",width:22,height:10,viewBox:"0 0 22 10",fill:"none"},
          h("path",{d:"M1 5 q 5 -6 10 0 t 10 0", stroke:"currentColor", strokeWidth:1, fill:"none"})),
      ]),

      h("div", { key:"word", className:"end-word" }, [
        h("span", { key:"p", className:"word-primary" }, wordInWordLang),
        h("span", { key:"s", className:"word-secondary" }, wordInHintLang.toLowerCase()),
      ]),

      h("div", { key:"pron", className:"pronounce-row" }, [
        h("button", { key:"en", className:"pronounce-btn", onClick: () => speak(enWord, "en") }, [
          h("span",{key:"f",className:"flag-mini"}, "EN"),
          h("span",{key:"i"},"🔊"),
          h("span",{key:"w", style:{fontFamily:"var(--font-display)", fontStyle:"italic"}}, enWord.toLowerCase()),
        ]),
        h("button", { key:"pt", className:"pronounce-btn", onClick: () => speak(ptWord, "pt") }, [
          h("span",{key:"f",className:"flag-mini"}, "PT"),
          h("span",{key:"i"},"🔊"),
          h("span",{key:"w", style:{fontFamily:"var(--font-display)", fontStyle:"italic"}}, ptWord.toLowerCase()),
        ]),
      ]),

      h("button", { key:"n", className:"btn btn-primary btn-full", onClick: next }, [
        t(L, "next_round"), h("span",{key:"a",style:{fontSize:"18px"}},"→")
      ]),
    ]),
  ]);
}
