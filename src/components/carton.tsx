'use client';

import Image from 'next/image';
import type { LoteriaCard } from '@/lib/types';
import { useGame } from '@/contexts/game-context';

interface CartonProps {
  board: LoteriaCard[];
  markedCardIds: Set<number>;
  onMark?: (cardId: number) => void;
  isWinner: boolean;
  boardNumber: number;
}

export default function Carton({ board, markedCardIds, onMark, isWinner, boardNumber }: CartonProps) {
  const { t, language } = useGame();
  const markedCount = board.filter(card => markedCardIds.has(card.id)).length;

  return (
    <div
      className={`p-4 bg-card/90 rounded-2xl shadow-lg border-2 backdrop-blur-sm transition-all duration-500 w-full flex flex-col gap-2 ${isWinner ? 'shadow-yellow-400/80 scale-105 border-primary' : 'shadow-black/20 border-transparent'}`}
    >
        <div className="flex justify-between items-center px-1">
            <h3 className="font-bold text-lg">{t.carton} {boardNumber}</h3>
        </div>

      <div className="grid grid-cols-4 grid-rows-2 gap-2">
        {board.map((card) => {
          const isMarked = markedCardIds.has(card.id);
          return (
            <div
              key={card.id}
              onClick={() => onMark?.(card.id)}
              className={`relative aspect-[3/4] rounded-md overflow-hidden transition-all duration-300 transform hover:scale-105 ${onMark ? 'cursor-pointer' : ''} ${isMarked ? 'opacity-90' : 'opacity-100'}`}
            >
              <Image
                src={card.image}
                alt={language === 'es' ? card.name.es : card.name.en}
                data-ai-hint={card.dataAiHint}
                width={80}
                height={120}
                className="w-full h-full object-cover border border-amber-800/50 rounded-md"
                priority
              />
               <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-0.5 text-center">
                <p className="text-white text-[10px] font-semibold truncate">
                  {language === 'es' ? card.name.es : card.name.en}
                </p>
              </div>
              {isMarked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                  <Image
                    src="/bean.svg"
                    alt="Bean marker"
                    width={40}
                    height={40}
                    className="w-2/3 h-2/3 object-contain animate-in fade-in zoom-in-50 duration-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center gap-2 pt-2">
            <span className="flex items-center justify-center bg-primary text-primary-foreground font-bold rounded-full h-6 w-6 text-sm">
                {markedCount}
            </span>
            <span className="text-sm text-muted-foreground pr-1">{t.marked}</span>
      </div>
    </div>
  );
}
