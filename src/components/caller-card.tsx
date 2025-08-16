'use client';

import Image from 'next/image';
import { LoteriaCard } from '@/lib/types';
import { useGame } from '@/contexts/game-context';
import { useEffect, useState } from 'react';

interface CallerCardProps {
  card: LoteriaCard | null;
}

export default function CallerCard({ card }: CallerCardProps) {
  const { t } = useGame();
  const [isFlipped, setIsFlipped] = useState(false);
  const [displayCard, setDisplayCard] = useState<LoteriaCard | null>(card);

  useEffect(() => {
    if (card) {
      setIsFlipped(true);
      setTimeout(() => {
        setDisplayCard(card);
        setIsFlipped(false);
      }, 300); // half of the animation duration
    }
  }, [card]);


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
                alt={t.language === 'es' ? displayCard.name.es : displayCard.name.en}
                data-ai-hint={displayCard.dataAiHint}
                width={200}
                height={300}
                className="w-full h-auto object-contain rounded-md border-2 border-amber-800/50"
                priority
              />
              <p className="mt-2 font-bold text-center text-white text-shadow-sm truncate w-full">
                {t.language === 'es' ? displayCard.name.es : displayCard.name.en}
              </p>
            </>
          ) : (
             <p className="font-bold text-center text-white">{t.waitingForPlayer}</p>
          )}
        </div>
        
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-4 rounded-lg shadow-lg border-4 border-amber-900/50 bg-amber-800/90" style={{ transform: 'rotateY(180deg)' }}>
           <h2 className="text-4xl font-bold text-white transform -scale-x-100">Lotería</h2>
        </div>
      </div>
    </div>
  );
}
