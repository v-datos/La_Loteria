'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { GameSettings, LoteriaCard } from '@/lib/types';
import { generateBoards, createShuffledDeck, checkWin } from '@/lib/game-logic';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Carton from './carton';
import CallerCard from './caller-card';
import { useGame } from '@/contexts/game-context';
import { aiCaller } from '@/ai/flows/ai-caller';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Volume2, VolumeX } from 'lucide-react';

interface GameBoardProps {
  settings: GameSettings;
  onWin: (boardIndex: number) => void;
  onRestart: () => void;
}

export default function GameBoard({ settings, onWin, onRestart }: GameBoardProps) {
  const { t, language } = useGame();
  const { toast } = useToast();
  const [boards, setBoards] = useState<LoteriaCard[][]>([]);
  const [deck, setDeck] = useState<LoteriaCard[]>([]);
  const [currentCard, setCurrentCard] = useState<LoteriaCard | null>(null);
  const [calledCardIds, setCalledCardIds] = useState<Set<number>>(new Set());
  const [markedCardIds, setMarkedCardIds] = useState<Set<number>>(new Set());
  const [isCalling, setIsCalling] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  const audio = useMemo(() => typeof window !== 'undefined' ? new Audio() : null, []);

  useEffect(() => {
    setBoards(generateBoards(settings.boardCount));
    setDeck(createShuffledDeck());
    setCurrentCard(null);
    setCalledCardIds(new Set());
    setMarkedCardIds(new Set());
  }, [settings]);

  const playAudio = useCallback((mediaUrl: string) => {
    if (audio && isSoundOn) {
      audio.src = mediaUrl;
      audio.play().catch(error => console.error("Audio play failed", error));
    }
  }, [audio, isSoundOn]);

  const handleNextCard = useCallback(async () => {
    if (deck.length === 0 || isCalling) return;

    setIsCalling(true);
    const nextCard = deck[deck.length - 1];
    
    try {
      if (isSoundOn) {
        const result = await aiCaller({ cardName: nextCard.name.es });
        playAudio(result.media);
      }
    } catch (error) {
      console.error('AI Caller failed:', error);
      toast({
        title: 'Error',
        description: 'Could not fetch card audio.',
        variant: 'destructive',
      });
    } finally {
      const audioDuration = audio?.duration ? (audio.duration * 1000) : 2000;
      setTimeout(() => {
        setDeck(prev => prev.slice(0, -1));
        setCurrentCard(nextCard);
        setCalledCardIds(prev => new Set(prev).add(nextCard.id));
        setIsCalling(false);
      }, isSoundOn ? audioDuration : 500);
    }
  }, [deck, isCalling, playAudio, toast, isSoundOn, audio]);
  
  const handleMarkCard = (cardId: number) => {
    if (calledCardIds.has(cardId)) {
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
        title: "Not so fast!",
        description: "That card hasn't been called yet.",
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
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-bold">{t.caller}</h2>
            <CallerCard card={currentCard} />
        </div>
        <div className="flex flex-col gap-4 items-center">
            <Button onClick={handleNextCard} disabled={isCalling || deck.length === 0} className="w-48 h-12 text-lg">
                {isCalling ? <Loader2 className="animate-spin" /> : t.nextCard}
            </Button>
            <div className="flex gap-4">
                <Button onClick={onRestart} variant="outline">{t.restartGame}</Button>
                <Button onClick={() => setIsSoundOn(!isSoundOn)} variant="ghost" size="icon">
                    {isSoundOn ? <Volume2/> : <VolumeX/>}
                </Button>
            </div>
        </div>
      </div>
      
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {boards.map((board, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-center">{t.board} {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <Carton
                  board={board}
                  markedCardIds={markedCardIds}
                  onMark={settings.autoMark ? undefined : handleMarkCard}
                  isWinner={false} // This is handled by the win screen
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
