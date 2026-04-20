import React from 'react';
import { useStore } from '../store.js';
import { t } from '../i18n.js';
import { useSpeech } from '../hooks.js';
import { WORDS } from '../data/words.js';
import { Topbar } from './Topbar.js';

const h = React.createElement;

export function GlossaryView() {
  const { persisted, prefs } = useStore();
  const L = prefs.uiLang;
  const speak = useSpeech();

  const entries = persisted.glossary;

  return h(React.Fragment, null, [
    h(Topbar, { key:"top" }),
    h("div", { key:"head", className:"card" }, [
      h("div",{key:"e",className:"eyebrow"}, t(L,"gloss_tab")),
      h("h2",{key:"h",style:{marginTop:"6px"}}, `${entries.length} ${t(L,"learned")}`),
    ]),
    h("div", { key:"list", className:"card" },
      entries.length === 0
        ? h("div",{className:"forest-empty-state"}, t(L,"gloss_empty"))
        : h("ul", { className:"gloss-list" },
            entries.map(g => {
              const word = WORDS.find(w => w.id === g.id);
              if (!word) return null;
              return h("li", { key:g.at, className:"gloss-item" }, [
                h("div",{key:"m",className:"gloss-meta"},[
                  h("div",{key:"w",className:"gloss-word"}, word.languages[prefs.wordLang].word),
                  h("div",{key:"t",className:"gloss-trans"}, word.languages[prefs.hintLang].word.toLowerCase()),
                ]),
                h("button", {
                  key:"pen",
                  className:"icon-btn",
                  "aria-label": t(L,"listen_word")+" "+word.languages.en.word,
                  onClick: () => speak(word.languages.en.word, "en"),
                }, h("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},[
                  h("polygon",{key:"s",points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}),
                  h("path",{key:"w1",d:"M15.54 8.46a5 5 0 0 1 0 7.07"}),
                ])),
                h("button", {
                  key:"ppt",
                  className:"icon-btn",
                  "aria-label": t(L,"listen_word")+" "+word.languages.pt.word,
                  onClick: () => speak(word.languages.pt.word, "pt"),
                }, h("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},[
                  h("polygon",{key:"s",points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}),
                  h("path",{key:"w1",d:"M15.54 8.46a5 5 0 0 1 0 7.07"}),
                  h("path",{key:"w2",d:"M19.07 4.93a10 10 0 0 1 0 14.14"}),
                ])),
                h("span", { key:"r", className:`gloss-result ${g.result}` },
                  g.result === "win" ? (L==="pt"?"plantada":"planted") : (L==="pt"?"perdida":"lost")),
              ]);
            })
          )
    ),
  ]);
}
