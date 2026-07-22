import type { AudioAccent, AudioSpeed } from '../context/EnglishLearningContext';

// TTS via Web Speech API do navegador — sem LLM, sem chamada de rede, nada é
// armazenado. Qualidade/disponibilidade de vozes varia por SO/navegador.

const RATE_BY_SPEED: Record<AudioSpeed, number> = {
  slow: 0.75,
  normal: 1,
};

const LANG_BY_ACCENT: Record<AudioAccent, string> = {
  us: 'en-US',
  uk: 'en-GB',
};

export const isSpeechSupported = (): boolean =>
  typeof window !== 'undefined' && 'speechSynthesis' in window;

export const speak = (text: string, speed: AudioSpeed, accent: AudioAccent): void => {
  if (!isSpeechSupported() || !text) return;

  const lang = LANG_BY_ACCENT[accent];
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = RATE_BY_SPEED[speed];

  const voices = window.speechSynthesis.getVoices();
  const matchingVoice = voices.find((v) => v.lang === lang) || voices.find((v) => v.lang.startsWith('en'));
  if (matchingVoice) utterance.voice = matchingVoice;

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = (): void => {
  if (isSpeechSupported()) window.speechSynthesis.cancel();
};
