import { useCallback } from 'react';

export function useSpeech() {
  const speak = useCallback((text, lang) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === "pt" ? "pt-BR" : "en-US";
      u.rate = 0.92;
      u.pitch = 1.0;
      window.speechSynthesis.speak(u);
    } catch {/* silencioso por NF-04 */}
  }, []);
  return speak;
}
