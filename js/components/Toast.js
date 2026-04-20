import React, { useState, useEffect } from 'react';
import { useStore } from '../store.js';
import { t } from '../i18n.js';

const h = React.createElement;

export function Toast() {
  const { state, dispatch, prefs } = useStore();
  const L = prefs.uiLang;
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (!state.lastAction) return;
    const a = state.lastAction;
    let m = null;
    if (a.type === "POWERUP") {
      if (a.tip === "rain") m = t(L,"tip_rain");
      else if (a.tip === "sun") m = t(L,"tip_sun");
      else if (a.tip === "compost") m = t(L,"tip_compost");
    }
    if (m) {
      setMsg(m);
      const timer = setTimeout(() => { setMsg(null); dispatch({type:"CLEAR_LAST_ACTION"}); }, 2200);
      return () => clearTimeout(timer);
    }
  }, [state.lastAction]);

  if (!msg) return null;
  return h("div", { className:"toast", role:"status" }, msg);
}
