import React, { useEffect, useRef, useMemo } from 'react';
import { useStore } from '../store.js';
import { t } from '../i18n.js';
import { useSpeech } from '../hooks.js';
import { WORDS } from '../data/words.js';
import { rollForestEntry } from '../species.js';
import { getSpecies } from '../data/treeSpecies.js';
import { RARITY_META } from '../data/rarityTiers.js';
import { getMaterial } from '../data/materials.js';
import { speakable } from '../pronunciation.js';
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
  const otherLang = state.wordLang === "pt" ? "en" : "pt";
  const wordInOtherLang = word.languages[otherLang].word;

  const roll = useMemo(() => rollForestEntry(word, state.wordLang), [word.id, state.wordLang]);
  const { speciesId: species, rarity, material, difficulty } = roll;
  const speciesName = t(L, getSpecies(species).nameKey);
  const rarityName = t(L, RARITY_META[rarity].nameKey);
  const materialMeta = getMaterial(material);
  const materialName = materialMeta ? t(L, materialMeta.nameKey) : null;
  const fullLabel = materialName
    ? `${speciesName} — ${rarityName} (${materialName})`
    : `${speciesName} — ${rarityName}`;

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
      next.forest = [
        ...(persisted.forest || []),
        { speciesId: species, rarity, material, wordId: word.id, difficulty, at: Date.now() },
      ].slice(-500);
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
      h("div",{key:"stg",className:`stage end-tree-halo halo-${win?rarity:"common"}`,style:{maxHeight:"28vh",maxWidth:"28vh",margin:"0 auto"},title:win?fullLabel:undefined},
        h(TreeSVG, { stage: win ? 0 : 6, species, speciesName, rarity: win?rarity:null, material: win?material:null })),
      win && h("div",{key:"meta",className:"end-tree-meta"},[
        h("span",{key:"s",className:"end-tree-species"}, speciesName),
        h("span",{key:"r",className:`end-tree-rarity rarity-${rarity}`}, rarityName),
        materialName && h("span",{key:"m",className:`end-tree-material material-${material}`}, materialName),
      ].filter(Boolean)),

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
        h("span", { key:"s", className:"word-secondary" }, wordInOtherLang.toLowerCase()),
      ]),

      h("div", { key:"pron", className:"pronounce-row" }, [
        h("button", { key:"en", className:"pronounce-btn", onClick: () => speak(speakable(enWord, "en"), "en") }, [
          h("span",{key:"f",className:"flag-mini"}, "EN"),
          h("span",{key:"i"},"🔊"),
          h("span",{key:"w", style:{fontFamily:"var(--font-display)", fontStyle:"italic"}}, enWord.toLowerCase()),
        ]),
        h("button", { key:"pt", className:"pronounce-btn", onClick: () => speak(speakable(ptWord, "pt"), "pt") }, [
          h("span",{key:"f",className:"flag-mini"}, "PT"),
          h("span",{key:"i"},"🔊"),
          h("span",{key:"w", style:{fontFamily:"var(--font-display)", fontStyle:"italic"}}, speakable(ptWord, "pt")),
        ]),
      ]),

      h("button", { key:"n", className:"btn btn-primary btn-full", onClick: next }, [
        t(L, "next_round"), h("span",{key:"a",style:{fontSize:"18px"}},"→")
      ]),
    ]),
  ]);
}
