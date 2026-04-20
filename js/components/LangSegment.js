import React from 'react';

const h = React.createElement;

export function LangSegment({ value, onChange, label, variant }) {
  return h("div", { className:"lang-field" }, [
    h("div",{key:"l",className:"lang-field-label"}, label),
    h("div", { key:"s", className:`lang-segment ${variant||""}`, role:"radiogroup", "aria-label": label }, [
      h("button", {
        key:"pt",
        role:"radio",
        "aria-checked": value==="pt",
        className:`seg-btn${value==="pt"?" on":""}`,
        onClick: () => onChange("pt"),
      }, [
        h("span",{key:"f",className:"seg-flag"}, "PT"),
        h("span",{key:"n"}, "Português"),
      ]),
      h("button", {
        key:"en",
        role:"radio",
        "aria-checked": value==="en",
        className:`seg-btn${value==="en"?" on":""}`,
        onClick: () => onChange("en"),
      }, [
        h("span",{key:"f",className:"seg-flag"}, "EN"),
        h("span",{key:"n"}, "English"),
      ]),
    ]),
  ]);
}
