import React from 'react';
import { useStore } from '../store.js';
import { t } from '../i18n.js';
import { WORDS } from '../data/words.js';
import { CATEGORIES } from '../data/categories.js';
import { Topbar } from './Topbar.js';
import { LangSegment } from './LangSegment.js';

const h = React.createElement;

export function SetupView() {
  const { state, dispatch, prefs, setPrefs, persisted } = useStore();
  const L = prefs.uiLang;

  const wordLang = prefs.wordLang;
  const hintLang = prefs.hintLang;
  const category = prefs.category;
  const ageGroup = prefs.ageGroup;
  const isAdult = ageGroup === "adult";

  const chooseWordLang = (lang) => setPrefs({ ...prefs, wordLang: lang });
  const chooseHintLang = (lang) => setPrefs({ ...prefs, hintLang: lang });
  const chooseCat = (cat) => setPrefs({ ...prefs, category: cat });
  const chooseAge = (val) => setPrefs({ ...prefs, ageGroup: val });
  const toggleAdult = () => setPrefs({ ...prefs, ageGroup: isAdult ? 10 : "adult" });

  const sameLang = wordLang === hintLang;

  const start = () => {
    let pool = category === "all" ? WORDS : WORDS.filter(w => w.category === category);
    if (!isAdult) {
      pool = pool.filter(w => w.minAge <= ageGroup);
    }
    dispatch({ type:"START_ROUND", payload: {
      pool,
      playedIds: persisted.playedIds,
      wordLang, hintLang, category,
    }});
  };

  return h(React.Fragment, null, [
    h(Topbar, { key:"top" }),
    h("div", { key:"hero", className:"card", style:{padding:"28px 24px"} }, [
      h("div", { key:"eye", className:"eyebrow" }, t(L, "setup_title")),
      h("h1", { key:"h", style:{marginTop:"6px"} }, [
        L==="pt" ? "Prepare o " : "Prepare the ",
        h("em",{key:"em"}, L==="pt" ? "solo." : "soil."),
      ]),
      h("p", { key:"p", style:{marginTop:"8px"} },
        L==="pt" ? "Escolha em que idioma você quer a palavra e a dica. Podem ser iguais ou diferentes." :
                   "Choose what language you want for the word and the hint. They can be the same or different."),
    ]),

    h("div", { key:"lang", className:"card" }, [
      h("div", { key:"eye", className:"eyebrow", style:{marginBottom:"14px"}}, L==="pt"?"idiomas":"languages"),
      h(LangSegment, {
        key:"w",
        value: wordLang,
        onChange: chooseWordLang,
        label: t(L, "choose_word"),
        variant: "word",
      }),
      h(LangSegment, {
        key:"h",
        value: hintLang,
        onChange: chooseHintLang,
        label: t(L, "choose_hint"),
        variant: "hint",
      }),
      sameLang && h("div", { key:"same", className:"lang-note" },
        L==="pt"
          ? "Palavra e dica no mesmo idioma — modo monolíngue."
          : "Word and hint in the same language — monolingual mode."
      ),
    ].filter(Boolean)),

    h("div", { key:"age", className:"card" }, [
      h("div", { key:"eye", className:"eyebrow", style:{marginBottom:"14px"} }, t(L, "age_section")),
      h("div", { key:"content", className:"age-section" }, [
        h("div", { key:"num", className:"age-display" },
          isAdult ? "∞" : ageGroup
        ),
        h("div", { key:"lbl", className:"age-display-label" },
          isAdult ? t(L, "age_adult") : t(L, "age_value", ageGroup)
        ),
        h("input", {
          key:"slider",
          type:"range",
          className:"age-slider",
          min: 6,
          max: 15,
          step: 1,
          value: isAdult ? 10 : ageGroup,
          disabled: isAdult,
          onChange: (e) => chooseAge(parseInt(e.target.value, 10)),
          "aria-label": t(L, "age_label"),
        }),
        h("div", { key:"bounds", className:"age-slider-bounds" }, [
          h("span", { key:"min" }, "6"),
          h("span", { key:"max" }, "15"),
        ]),
        h("button", {
          key:"adult",
          className:"chip age-adult-toggle",
          "aria-pressed": isAdult,
          onClick: toggleAdult,
        }, t(L, "age_adult")),
      ]),
      h("div", { key:"note", className:"lang-note", style:{marginTop:"10px"} },
        isAdult ? t(L, "age_adult_note") : t(L, "age_note")
      ),
    ]),

    h("div", { key:"cat", className:"card" }, [
      h("div", { key:"eye", className:"eyebrow", style:{marginBottom:"14px"}}, t(L, "choose_category")),
      h("div", { key:"chips", className:"chips" },
        CATEGORIES.map(c => h("button", {
          key: c.id,
          className: "chip",
          "aria-pressed": category === c.id,
          onClick: () => chooseCat(c.id),
        }, c.label[L]))
      ),
    ]),

    h("div", { key:"go", style:{marginTop:"18px"} },
      h("button", { className:"btn btn-primary btn-full", onClick: start },
        [t(L, "start"), h("span",{key:"a",style:{fontSize:"18px"}},"→")]
      )
    ),
  ]);
}
