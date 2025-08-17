'use client';

import { useState, useEffect, useCallback } from 'react';
import type { GameSettings, LoteriaCard } from '@/lib/types';
import { generateBoards, createShuffledDeck, checkWin } from '@/lib/game-logic';
import { Button } from '@/components/ui/button';
import Carton from './carton';
import CallerCard from './caller-card';
import CalledCards from './called-cards';
import { useGame } from '@/contexts/game-context';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { LOTERIA_CARDS } from '@/lib/loteria-cards';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User } from 'lucide-react';

interface GameBoardProps {
  settings: GameSettings;
  onWin: (boardIndex: number) => void;
  onRestart: () => void;
}

export default function GameBoard({ settings, onWin, onRestart }: GameBoardProps) {
  const { t, playerName, avatarUrl, language } = useGame();
  const { toast } = useToast();
  const [boards, setBoards] = useState<LoteriaCard[][]>([]);
  const [deck, setDeck] = useState<LoteriaCard[]>([]);
  const [currentCard, setCurrentCard] = useState<LoteriaCard | null>(null);
  const [calledCards, setCalledCards] = useState<LoteriaCard[]>([]);
  const [markedCardIds, setMarkedCardIds] = useState<Set<number>>(new Set());
  const [isCalling, setIsCalling] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isAiCallerEnabled, setIsAiCallerEnabled] = useState(false);


  useEffect(() => {
    setBoards(generateBoards(settings.boardCount));
    setDeck(createShuffledDeck());
    setCurrentCard(null);
    setCalledCards([]);
    setMarkedCardIds(new Set());
  }, [settings]);

  const handleNextCard = useCallback(async () => {
    if (deck.length === 0 || isCalling) return;

    setIsCalling(true);
    const nextCard = deck[deck.length - 1];
    
    setDeck(prev => prev.slice(0, -1));
    setCurrentCard(nextCard);
    setCalledCards(prev => [...prev, nextCard]);

    setTimeout(() => {
      setIsCalling(false);
    }, 700);

  }, [deck, isCalling, isAiCallerEnabled, language, toast]);
  
  const handleMarkCard = (cardId: number) => {
    const isCalled = calledCards.some(c => c.id === cardId);
    if (isCalled) {
      setMarkedCardIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(cardId)) {
          newSet.delete(cardId);
        } else {
          newSet.add(cardId);
        }
        return newSet;
      });
    } else {
      toast({
        title: "¡No tan rápido!",
        description: "Esa ficha no ha sido cantada todavía.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (settings.autoMark && currentCard) {
      setMarkedCardIds(prev => new Set(prev).add(currentCard.id));
    }
  }, [currentCard, settings.autoMark]);

  useEffect(() => {
    boards.forEach((board, index) => {
      if (checkWin(board, markedCardIds, settings.winCondition)) {
        onWin(index + 1);
      }
    });
  }, [markedCardIds, boards, settings.winCondition, onWin]);

  return (
    <div className="w-full h-screen flex flex-col items-center gap-2 p-4 kitchen-table-bg">
       <header className="w-full flex justify-between items-center px-4 relative h-20">
        <div className="absolute left-4">
          <Button onClick={onRestart} variant="outline" className='text-xl tracking-wider font-body border-2 border-primary'>{t.restartGame}</Button>
        </div>
        <div className="flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src={avatarUrl} alt={playerName} />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold font-body tracking-wider">{playerName}</h2>
        </div>
      </header>
      
      <main className="w-full flex-1 grid grid-cols-[250px_1fr_250px] items-start justify-center gap-4">
        <div className="flex flex-col items-center justify-start h-full">
            <CalledCards cards={calledCards} deckSize={LOTERIA_CARDS.length} />
        </div>
        
        <div className="flex flex-col items-center justify-center gap-4 h-full">
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-8 content-center">
            {boards.map((board, index) => (
              <div key={index} className="w-full max-w-[300px]">
                <Carton
                  board={board}
                  markedCardIds={markedCardIds}
                  onMark={settings.autoMark ? undefined : handleMarkCard}
                  isWinner={false}
                  boardNumber={index + 1}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-start gap-4 h-full">
            <div className='flex flex-col items-center gap-2'>
              <h3 className='text-3xl font-body tracking-wider font-bold -rotate-2'>{t.calledCard}</h3>
              <CallerCard card={currentCard} />
            </div>
            <Button onClick={handleNextCard} disabled={isCalling || deck.length === 0} className="w-48 h-12 text-2xl font-body tracking-wider">
                {isCalling ? <Loader2 className="animate-spin" /> : t.nextCard}
            </Button>
        </div>
      </main>
    </div>
  );
}
