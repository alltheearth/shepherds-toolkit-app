import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type AudioSpeed = 'slow' | 'normal';
export type AudioAccent = 'us' | 'uk';
export type HintTrigger = 'onClick' | 'auto';

export interface EnglishLearningSettings {
  level: EnglishLevel;
  hintTrigger: HintTrigger;
  audioSpeed: AudioSpeed;
  audioAccent: AudioAccent;
}

interface EnglishLearningContextType {
  settings: EnglishLearningSettings;
  setLevel: (level: EnglishLevel) => void;
  setHintTrigger: (trigger: HintTrigger) => void;
  setAudioSpeed: (speed: AudioSpeed) => void;
  setAudioAccent: (accent: AudioAccent) => void;
}

const STORAGE_KEY = 'english-learning-settings';

const defaultSettings: EnglishLearningSettings = {
  level: 'B1',
  hintTrigger: 'onClick',
  audioSpeed: 'normal',
  audioAccent: 'us',
};

const EnglishLearningContext = createContext<EnglishLearningContextType | undefined>(undefined);

export const useEnglishLearning = (): EnglishLearningContextType => {
  const context = useContext(EnglishLearningContext);
  if (!context) {
    throw new Error('useEnglishLearning deve ser usado dentro de EnglishLearningProvider');
  }
  return context;
};

const getInitialSettings = (): EnglishLearningSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultSettings, ...JSON.parse(stored) };
  } catch {
    // localStorage indisponível ou JSON inválido: cai no padrão
  }
  return defaultSettings;
};

interface EnglishLearningProviderProps {
  children: ReactNode;
}

export const EnglishLearningProvider: React.FC<EnglishLearningProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<EnglishLearningSettings>(getInitialSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const setLevel = (level: EnglishLevel) => setSettings((prev) => ({ ...prev, level }));
  const setHintTrigger = (hintTrigger: HintTrigger) => setSettings((prev) => ({ ...prev, hintTrigger }));
  const setAudioSpeed = (audioSpeed: AudioSpeed) => setSettings((prev) => ({ ...prev, audioSpeed }));
  const setAudioAccent = (audioAccent: AudioAccent) => setSettings((prev) => ({ ...prev, audioAccent }));

  return (
    <EnglishLearningContext.Provider value={{ settings, setLevel, setHintTrigger, setAudioSpeed, setAudioAccent }}>
      {children}
    </EnglishLearningContext.Provider>
  );
};
