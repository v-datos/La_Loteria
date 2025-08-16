'use client';

import Image from 'next/image';
import type { LoteriaCard } from '@/lib/types';
import { useGame } from '@/contexts/game-context';

interface CartonProps {
  board: LoteriaCard[];
  markedCardIds: Set<number>;
  onMark?: (cardId: number) => void;
  isWinner: boolean;
}

export default function Carton({ board, markedCardIds, onMark, isWinner }: CartonProps) {
  const { t } = useGame();
  return (
    <div
      className={`p-1 bg-amber-700/80 rounded-lg shadow-lg border-2 border-amber-900/50 backdrop-blur-sm transition-all duration-500 ${isWinner ? 'shadow-yellow-400/80 scale-105' : 'shadow-black/30'}`}
      style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23a0522d\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }}
    >
      <div className="grid grid-cols-4 gap-1">
        {board.map((card) => {
          const isMarked = markedCardIds.has(card.id);
          return (
            <div
              key={card.id}
              onClick={() => onMark?.(card.id)}
              className={`relative aspect-[3/4] rounded-sm overflow-hidden transition-all duration-300 transform hover:scale-105 ${onMark ? 'cursor-pointer' : ''} ${isMarked ? 'opacity-90' : 'opacity-100'}`}
            >
              <Image
                src={card.image}
                alt={t.language === 'es' ? card.name.es : card.name.en}
                data-ai-hint={card.dataAiHint}
                width={100}
                height={150}
                className="w-full h-full object-cover border border-amber-800/50 rounded-sm"
                priority
              />
              <div className="absolute inset-0 bg-black/10"></div>
              {isMarked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                  <Image
                    src="/bean.svg"
                    alt="Bean marker"
                    width={50}
                    height={50}
                    className="w-3/4 h-3/4 object-contain animate-in fade-in zoom-in-50 duration-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
