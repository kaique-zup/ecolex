import React, { useReducer, useEffect, useMemo, useState, useCallback } from 'react';
import { StoreCtx } from './store.js';
import { gameReducer, initialState } from './reducer.js';
import { loadPersisted, savePersisted } from './persistence.js';
import { Onboarding } from './components/Onboarding.js';
import { SetupView } from './components/SetupView.js';
import { PlayView } from './components/PlayView.js';
import { EndView } from './components/EndView.js';
import { ForestView } from './components/ForestView.js';
import { GlossaryView } from './components/GlossaryView.js';
import { TabBar } from './components/TabBar.js';
import { Toast } from './components/Toast.js';

const h = React.createElement;

export function App() {
  const [persisted, _setPersisted] = useState(loadPersisted);
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [tab, setTab] = useState("play");
  const [uiLang, setUiLang] = useState(() => {
    const nav = navigator.language || "pt";
    return nav.toLowerCase().startsWith("en") ? "en" : "pt";
  });

  const setPersisted = useCallback((next) => {
    _setPersisted(next);
    savePersisted(next);
  }, []);

  const prefs = useMemo(() => ({
    uiLang,
    wordLang: persisted.preferences.wordLang,
    hintLang: persisted.preferences.hintLang,
    category: persisted.preferences.category,
  }), [uiLang, persisted.preferences]);

  const setPrefs = useCallback((next) => {
    setPersisted({
      ...persisted,
      preferences: {
        wordLang: next.wordLang ?? persisted.preferences.wordLang,
        hintLang: next.hintLang ?? persisted.preferences.hintLang,
        category: next.category ?? persisted.preferences.category,
        reducedMotion: persisted.preferences.reducedMotion,
      }
    });
  }, [persisted, setPersisted]);

  useEffect(() => {
    document.documentElement.lang = uiLang === "pt" ? "pt-BR" : "en";
  }, [uiLang]);

  const store = {
    state, dispatch,
    persisted, setPersisted,
    prefs, setPrefs, setUiLang,
    tab, setTab,
  };

  const isPlaying = persisted.onboarded && tab === "play" && state.phase === "playing";
  const shellCls = "shell" + (isPlaying ? "" : " shell-narrow");

  return h(StoreCtx.Provider, { value: store },
    !persisted.onboarded
      ? h(Onboarding, null)
      : h("div", { className: shellCls }, [
          tab === "play" && (
            state.phase === "setup" ? h(SetupView, { key:"setup" }) :
            state.phase === "playing" ? h(PlayView, { key:"play" }) :
            h(EndView, { key:"end" })
          ),
          tab === "forest" && h(ForestView, { key:"forest" }),
          tab === "gloss"  && h(GlossaryView, { key:"gloss" }),
          h(TabBar, { key:"tabs" }),
          h(Toast, { key:"toast" }),
        ])
  );
}
