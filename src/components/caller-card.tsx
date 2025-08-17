
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
  const [visible, setVisible] = useState(false);
  const [displayCard, setDisplayCard] = useState<LoteriaCard | null>(null);

  useEffect(() => {
    if (card) {
      setVisible(false); // Hide to start fade-out
      const timer = setTimeout(() => {
        setDisplayCard(card);
        setVisible(true); // Show to start fade-in
      }, 250); // Short delay to allow for fade-out/in effect
      return () => clearTimeout(timer);
    } else {
      setDisplayCard(null);
    }
  }, [card]);


  return (
    <div className="w-full max-w-[200px] aspect-[3/4]">
        <div className={`relative w-full h-full p-2 rounded-lg shadow-lg border-4 border-amber-900/50 bg-amber-700/80 transition-opacity duration-500 ${visible && displayCard ? 'opacity-100' : 'opacity-0'}`}>
          {displayCard ? (
            <Image
              src={displayCard.image}
              alt={language === 'es' ? displayCard.name.es : displayCard.name.en}
              data-ai-hint={displayCard.dataAiHint}
              width={200}
              height={300}
              className="w-full h-full object-cover rounded-md border-2 border-amber-800/50"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4 rounded-lg shadow-lg border-4 border-amber-900/50 bg-cover bg-center" style={{ backgroundImage: 'url(/card-back.svg)' }}>
                 <p className="font-bold text-center text-white text-3xl font-body tracking-wider">{t.waitingForPlayer}</p>
             </div>
          )}
        </div>
        {!displayCard && (
             <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4 rounded-lg shadow-lg border-4 border-amber-900/50 bg-cover bg-center" style={{ backgroundImage: 'url(/card-back.svg)' }}>
                 <p className="font-bold text-center text-white text-3xl font-body tracking-wider">{t.waitingForPlayer}</p>
             </div>
        )}
    </div>
  );
}
