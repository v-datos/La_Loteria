'use client';

import Image from 'next/image';
import type { LoteriaCard } from '@/lib/types';
import { useGame } from '@/contexts/game-context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CalledCardsProps {
  cards: LoteriaCard[];
  deckSize: number;
}

export default function CalledCards({ cards, deckSize }: CalledCardsProps) {
  const { t, language } = useGame();
  const remainingCount = deckSize - cards.length;

  return (
    <Card className="h-full flex flex-col bg-card/80 backdrop-blur-sm">
      <CardHeader className="p-4">
        <CardTitle className="text-center text-3xl font-body tracking-wider">{t.calledCards}</CardTitle>
        <p className="text-center text-xl font-body tracking-wider text-muted-foreground">
          {cards.length} {t.of} {deckSize} ({remainingCount} {t.remaining})
        </p>
      </CardHeader>
      <CardContent className="flex-1 p-2 overflow-hidden">
        <ScrollArea className="h-full">
            <div className="grid grid-cols-4 gap-1 p-2">
                {[...cards].reverse().map((card) => (
                    <div key={card.id} className="aspect-[3/4] rounded-sm overflow-hidden border border-amber-800/20">
                    <Image
                        src={card.image}
                        alt={language === 'es' ? card.name.es : card.name.en}
                        data-ai-hint={card.dataAiHint}
                        width={60}
                        height={90}
                        className="w-full h-full object-cover"
                    />
                    </div>
                ))}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
