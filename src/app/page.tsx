'use client';

import { useState } from 'react';
import type { GameSettings } from '@/lib/types';
import GameSettingsComponent from '@/components/game-settings';
import GameBoard from '@/components/game-board';
import WinScreen from '@/components/win-screen';

export type GameState = 'settings' | 'playing' | 'win';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('settings');
  const [settings, setSettings] = useState<GameSettings>({
    winCondition: 'line',
    boardCount: 1,
    autoMark: true,
  });
  const [winner, setWinner] = useState<number | null>(null);

  const handleStartGame = (newSettings: GameSettings) => {
    setSettings(newSettings);
    setGameState('playing');
    setWinner(null);
  };

  const handleWin = (boardIndex: number) => {
    setWinner(boardIndex);
    setGameState('win');
  };

  const handleRestart = () => {
    setGameState('settings');
    setWinner(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      {gameState === 'settings' && <GameSettingsComponent onStartGame={handleStartGame} />}
      {gameState === 'playing' && (
        <GameBoard settings={settings} onWin={handleWin} onRestart={handleRestart} />
      )}
      {gameState === 'win' && winner !== null && <WinScreen winnerBoard={winner} onPlayAgain={handleRestart} />}
    </main>
  );
}
