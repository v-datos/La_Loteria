'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Language } from '@/lib/types';
import { translations } from '@/lib/translations';

interface GameContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof translations)[Language];
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
