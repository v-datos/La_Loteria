'use client';

import Confetti from './confetti';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/game-context';

interface WinScreenProps {
  winnerBoard: number;
  onPlayAgain: () => void;
}

export default function WinScreen({ winnerBoard, onPlayAgain }: WinScreenProps) {
  const { t } = useGame();
  return (
    <>
      <Confetti />
      <div className="fixed inset-0 bg-black/50 z-40" />
      <Card className="z-50 text-center w-full max-w-md bg-card/90 backdrop-blur-lg border-2 border-primary/50 shadow-2xl shadow-primary/30">
        <CardHeader>
          <CardTitle className="text-5xl font-bold text-primary drop-shadow-lg">{t.congratulations}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-medium">
            {t.youWon} {winnerBoard}!
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={onPlayAgain} size="lg" className="w-full text-xl py-6 bg-accent hover:bg-accent/90 text-accent-foreground">
            {t.playAgain}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
