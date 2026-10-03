import { describe, expect, it } from 'vitest';
import { checkWin, createShuffledDeck, generateBoards } from './game-logic';
import { LOTERIA_CARDS } from './loteria-cards';
import type { LoteriaCard } from './types';

const ids = (cards: LoteriaCard[]) => cards.map(card => card.id);

// A fixed board laid out as the carton shows it: two rows of four.
//   0 1 2 3
//   4 5 6 7
const board = LOTERIA_CARDS.slice(0, 8);
const marked = (...indexes: number[]) => new Set(indexes.map(i => board[i].id));

describe('LOTERIA_CARDS', () => {
  it('has unique ids', () => {
    expect(new Set(ids(LOTERIA_CARDS)).size).toBe(LOTERIA_CARDS.length);
  });

  it('has enough fichas to fill a carton', () => {
    expect(LOTERIA_CARDS.length).toBeGreaterThanOrEqual(8);
  });
});

describe('generateBoards', () => {
  it('creates the requested number of cartones', () => {
    expect(generateBoards(0)).toHaveLength(0);
    expect(generateBoards(1)).toHaveLength(1);
    expect(generateBoards(4)).toHaveLength(4);
  });

  it('fills each carton with 8 distinct fichas from the deck', () => {
    const allIds = new Set(ids(LOTERIA_CARDS));
    for (const carton of generateBoards(10)) {
      expect(carton).toHaveLength(8);
      expect(new Set(ids(carton)).size).toBe(8);
      for (const card of carton) {
        expect(allIds.has(card.id)).toBe(true);
      }
    }
  });

  it('does not always produce the same carton', () => {
    const cartones = generateBoards(20).map(carton => ids(carton).join(','));
    expect(new Set(cartones).size).toBeGreaterThan(1);
  });
});

describe('createShuffledDeck', () => {
  it('contains every ficha exactly once', () => {
    const deck = createShuffledDeck();
    expect(deck).toHaveLength(LOTERIA_CARDS.length);
    expect([...ids(deck)].sort((a, b) => a - b)).toEqual(
      [...ids(LOTERIA_CARDS)].sort((a, b) => a - b)
    );
  });

  it('does not modify the source deck', () => {
    const before = ids(LOTERIA_CARDS);
    createShuffledDeck();
    expect(ids(LOTERIA_CARDS)).toEqual(before);
  });

  it('draws in a different order across games', () => {
    const orders = Array.from({ length: 5 }, () => ids(createShuffledDeck()).join(','));
    expect(new Set(orders).size).toBeGreaterThan(1);
  });
});

describe('checkWin', () => {
  describe('line', () => {
    it('wins with the top row marked', () => {
      expect(checkWin(board, marked(0, 1, 2, 3), 'line')).toBe(true);
    });

    it('wins with the bottom row marked', () => {
      expect(checkWin(board, marked(4, 5, 6, 7), 'line')).toBe(true);
    });

    it('does not win with an incomplete row', () => {
      expect(checkWin(board, marked(0, 1, 2), 'line')).toBe(false);
    });

    it('does not win with four marks spread across rows', () => {
      expect(checkWin(board, marked(0, 1, 6, 7), 'line')).toBe(false);
    });

    it('does not win with nothing marked', () => {
      expect(checkWin(board, new Set(), 'line')).toBe(false);
    });
  });

  describe('full', () => {
    it('wins with every ficha marked', () => {
      expect(checkWin(board, marked(0, 1, 2, 3, 4, 5, 6, 7), 'full')).toBe(true);
    });

    it('does not win with one ficha missing', () => {
      expect(checkWin(board, marked(0, 1, 2, 3, 4, 5, 6), 'full')).toBe(false);
    });

    it('does not win with only a line', () => {
      expect(checkWin(board, marked(0, 1, 2, 3), 'full')).toBe(false);
    });
  });

  describe('corners', () => {
    it('wins with the four corners marked', () => {
      expect(checkWin(board, marked(0, 3, 4, 7), 'corners')).toBe(true);
    });

    it('does not win with three corners', () => {
      expect(checkWin(board, marked(0, 3, 4), 'corners')).toBe(false);
    });
  });

  it('ignores called fichas that are not on the carton', () => {
    const offBoard = LOTERIA_CARDS.slice(8).map(card => card.id);
    expect(checkWin(board, new Set(offBoard), 'line')).toBe(false);
    expect(checkWin(board, new Set([...offBoard, ...marked(0, 1, 2, 3)]), 'line')).toBe(true);
  });
});
