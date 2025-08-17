export interface LoteriaCard {
  id: number;
  name: {
    en: string;
    es: string;
  };
  image: string;
  dataAiHint: string;
}

export type WinCondition = 'line' | 'full' | 'corners';

export interface GameSettings {
  winCondition: WinCondition;
  boardCount: number;
  autoMark: boolean;
}

export type Language = 'en' | 'es';

export type Translations = {
  [key in Language]: {
    appName: string;
    subtitle: string;
    line: string;
    fullBoard: string;
    corners: string;
    winCondition: string;
    howManyCartons: string;
    marking: string;
    automatic: string;
    manual: string;
    play: string;
    nextCard: string;
    restartGame: string;
    congratulations: string;
    youWon: string;
    playAgain: string;
    carton: string;
    caller: string;
    waitingForPlayer: string;
    calling: string;
    language: string;
    english: string;
    spanish: string;
    yourName: string;
    generateAvatar: string;
    calledCards: string;
    remaining: string;
    of: string;
    calledCard: string;
    marked: string;
  };
};
