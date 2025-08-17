
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Language, TranslationSet } from '@/lib/types';
import { translations } from '@/lib/translations';

interface GameContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationSet;
  playerName: string;
  setPlayerName: (name: string) => void;
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');
  const [playerName, setPlayerName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const value = {
    language,
    setLanguage,
    t: translations[language],
    playerName,
    setPlayerName,
    avatarUrl,
    setAvatarUrl,
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

    