import { LOTERIA_CARDS } from './loteria-cards';
import type { LoteriaCard, WinCondition } from './types';

// Fisher-Yates shuffle algorithm
function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function generateBoards(count: number): LoteriaCard[][] {
  const boards: LoteriaCard[][] = [];
  for (let i = 0; i < count; i++) {
    const shuffledCards = shuffle(LOTERIA_CARDS);
    boards.push(shuffledCards.slice(0, 16));
  }
  return boards;
}

export function createShuffledDeck(): LoteriaCard[] {
  return shuffle(LOTERIA_CARDS);
}

const winningPatterns = {
  line: [
    // Rows
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    // Columns
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    // Diagonals
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ],
  full: [Array.from({ length: 16 }, (_, i) => i)],
};

export function checkWin(
  board: LoteriaCard[],
  markedCardIds: Set<number>,
  winCondition: WinCondition
): boolean {
  const patterns = winningPatterns[winCondition];
  const boardCardIds = board.map(card => card.id);

  for (const pattern of patterns) {
    const isWin = pattern.every(index => {
      const cardId = boardCardIds[index];
      return markedCardIds.has(cardId);
    });
    if (isWin) {
      return true;
    }
  }

  return false;
}
