'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { GameSettings, LoteriaCard } from '@/lib/types';
import { generateBoards, createShuffledDeck, checkWin } from '@/lib/game-logic';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Carton from './carton';
import CallerCard from './caller-card';
import CalledCards from './called-cards';
import { useGame } from '@/contexts/game-context';
import { aiCaller } from '@/ai/flows/ai-caller';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Volume2, VolumeX } from 'lucide-react';
import { LOTERIA_CARDS } from '@/lib/loteria-cards';

interface GameBoardProps {
  settings: GameSettings;
  onWin: (boardIndex: number) => void;
  onRestart: () => void;
}

export default function GameBoard({ settings, onWin, onRestart }: GameBoardProps) {
  const { t } = useGame();
  const { toast } = useToast();
  const [boards, setBoards] = useState<LoteriaCard[][]>([]);
  const [deck, setDeck] = useState<LoteriaCard[]>([]);
  const [currentCard, setCurrentCard] = useState<LoteriaCard | null>(null);
  const [calledCards, setCalledCards] = useState<LoteriaCard[]>([]);
  const [markedCardIds, setMarkedCardIds] = useState<Set<number>>(new Set());
  const [isCalling, setIsCalling] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  const audio = useMemo(() => typeof window !== 'undefined' ? new Audio() : null, []);

  useEffect(() => {
    setBoards(generateBoards(settings.boardCount));
    setDeck(createShuffledDeck());
    setCurrentCard(null);
    setCalledCards([]);
    setMarkedCardIds(new Set());
  }, [settings]);

  const playAudio = useCallback((mediaUrl: string, onEnded: () => void) => {
    if (audio && isSoundOn) {
      audio.src = mediaUrl;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          audio.onended = onEnded;
        }).catch(error => {
          console.error("Audio play failed", error);
          onEnded(); 
        });
      }
    } else {
      setTimeout(onEnded, 500);
    }
  }, [audio, isSoundOn]);

  const handleNextCard = useCallback(async () => {
    if (deck.length === 0 || isCalling) return;

    setIsCalling(true);
    const nextCard = deck[deck.length - 1];
    
    const processNextCard = () => {
      setDeck(prev => prev.slice(0, -1));
      setCurrentCard(nextCard);
      setCalledCards(prev => [...prev, nextCard]);
      setIsCalling(false);
    };

    try {
      const result = await aiCaller({ cardName: nextCard.name.es });
      playAudio(result.media, processNextCard);
    } catch (error) {
      console.error('AI Caller failed:', error);
      toast({
        title: 'Error',
        description: 'Could not fetch card audio.',
        variant: 'destructive',
      });
      processNextCard();
    }
  }, [deck, isCalling, playAudio, toast]);
  
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

  const calledCardIds = useMemo(() => new Set(calledCards.map(c => c.id)), [calledCards]);
  useEffect(() => {
    boards.forEach((board, index) => {
      if (checkWin(board, markedCardIds, settings.winCondition)) {
        onWin(index + 1);
      }
    });
  }, [markedCardIds, boards, settings.winCondition, onWin]);

  return (
    <div className="w-full h-screen flex flex-col items-center gap-4 p-4">
      <header className="w-full flex justify-end">
          <Button onClick={() => setIsSoundOn(!isSoundOn)} variant="ghost" size="icon">
              {isSoundOn ? <Volume2/> : <VolumeX/>}
          </Button>
      </header>
      
      <main className="w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-4">
            <CallerCard card={currentCard} />
            <Button onClick={handleNextCard} disabled={isCalling || deck.length === 0} className="w-48 h-12 text-lg">
                {isCalling ? <Loader2 className="animate-spin" /> : t.nextCard}
            </Button>
            <Button onClick={onRestart} variant="outline">{t.restartGame}</Button>
        </div>
        
        <div className="w-full flex-1 flex flex-wrap justify-center items-start gap-2 max-w-4xl">
          {boards.map((board, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <h3 className="font-bold text-lg">{t.carton} {index + 1}</h3>
              <Carton
                board={board}
                markedCardIds={markedCardIds}
                onMark={settings.autoMark ? undefined : handleMarkCard}
                isWinner={false} // This is handled by the win screen
              />
            </div>
          ))}
        </div>
        
        <aside className="w-full md:w-64">
           <CalledCards cards={calledCards} deckSize={LOTERIA_CARDS.length} />
        </aside>
      </main>
    </div>
  );
}
