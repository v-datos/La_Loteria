
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
      if (displayCard) {
        setIsFlipped(false); // Flip back to hide
      }
      const timer = setTimeout(() => {
        setDisplayCard(card);
        setIsFlipped(true); // Flip to show new card
      }, 300); // Wait for flip-back animation
      return () => clearTimeout(timer);
    } else {
        setDisplayCard(null);
        setIsFlipped(false);
    }
  }, [card]);

  return (
    <div className="w-full max-w-[200px] aspect-[3/4] perspective-1000">
      <div
        className={`relative w-full h-full preserve-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-4 rounded-lg shadow-lg border-4 border-amber-900/50 bg-cover bg-center" style={{ backgroundImage: 'url(/card-back.svg)' }}>
           {!displayCard && <p className="font-bold text-center text-white text-3xl font-body tracking-wider">{t.waitingForPlayer}</p>}
        </div>

        {/* Card Front */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 p-2 rounded-lg shadow-lg border-4 border-amber-900/50 bg-amber-700/80">
          {displayCard && (
            <Image
              src={displayCard.image}
              alt={language === 'es' ? displayCard.name.es : displayCard.name.en}
              data-ai-hint={displayCard.dataAiHint}
              width={200}
              height={300}
              className="w-full h-full object-cover rounded-md border-2 border-amber-800/50"
              priority
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Add these to globals.css or a relevant stylesheet if they don't exist
// .perspective-1000 { perspective: 1000px; }
// .preserve-3d { transform-style: preserve-3d; }
// .rotate-y-180 { transform: rotateY(180deg); }
// .backface-hidden { backface-visibility: hidden; }
    
