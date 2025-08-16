'use client';

import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  style: React.CSSProperties;
}

const colors = ['#FFC107', '#D2691E', '#FF5722', '#8B4513', '#FFFFFF'];

const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const newPieces: ConfettiPiece[] = Array.from({ length: 150 }).map((_, i) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomAnimationDuration = Math.random() * 3 + 4; // 4s to 7s
      const randomAnimationDelay = Math.random() * 5; // 0s to 5s
      const randomXStart = Math.random() * 100; // 0vw to 100vw
      const randomRotationStart = Math.random() * 360;
      const randomRotationEnd = Math.random() * 360 + randomRotationStart;
      const randomSize = Math.random() * 8 + 6; // 6px to 14px

      return {
        id: i,
        style: {
          backgroundColor: randomColor,
          left: `${randomXStart}vw`,
          width: `${randomSize}px`,
          height: `${randomSize}px`,
          top: `${-randomSize}px`,
          position: 'fixed',
          animationName: 'confetti-fall',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDuration: `${randomAnimationDuration}s`,
          animationDelay: `${randomAnimationDelay}s`,
          transform: `rotate(${randomRotationStart}deg)`,
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        },
      };
    });

    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div key={piece.id} style={piece.style} />
      ))}
    </div>
  );
};

export default Confetti;
