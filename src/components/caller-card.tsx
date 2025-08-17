
'use client';

import Image from 'next/image';
import { LoteriaCard } from '@/lib/types';
import { useGame } from '@/contexts/game-context';
import { useEffect, useState } from 'react';

interface CallerCardProps {
  card: LoteriaCard | null;
}

export default function CallerCard({ card }: CallerCardProps) {
  const { t, language } = useGame();
  const [isFlipped, setIsFlipped] = useState(false);
  const [displayCard, setDisplayCard] = useState<LoteriaCard | null>(null);

  useEffect(() => {
    if (card) {
      if (displayCard === null) {
        // First card, just show it without flipping
        setDisplayCard(card);
      } else {
        // Subsequent cards, do the flip animation
        setIsFlipped(true);
        setTimeout(() => {
          setDisplayCard(card);
          setIsFlipped(false);
        }, 300); // half of the animation duration
      }
    } else {
      // Reset when game restarts
      setDisplayCard(null);
    }
  }, [card, displayCard]);


  return (
    <div className="w-full max-w-[200px] aspect-[3/4] perspective-[1000px]">
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-in-out`}
        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Card Front */}
        <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-2 rounded-lg shadow-lg border-4 border-amber-900/50 bg-amber-700/80">
          {displayCard ? (
            <>
              <Image
                src={displayCard.image}
                alt={language === 'es' ? displayCard.name.es : displayCard.name.en}
                data-ai-hint={displayCard.dataAiHint}
                width={200}
                height={300}
                className="w-full h-full object-cover rounded-md border-2 border-amber-800/50"
                priority
              />
            </>
          ) : (
             <p className="font-bold text-center text-white text-3xl font-body tracking-wider">{t.waitingForPlayer}</p>
          )}
        </div>
        
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-4 rounded-lg shadow-lg border-4 border-amber-900/50 bg-cover bg-center" style={{ transform: 'rotateY(180deg)', backgroundImage: 'url(/card-back.svg)' }}>
        </div>
      </div>
    </div>
  );
}
