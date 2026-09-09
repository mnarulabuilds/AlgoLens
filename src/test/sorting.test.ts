import { describe, it, expect } from 'vitest';
import { isSorted, bubbleSortPass } from '../common/helpers/sorting';

describe('sorting helpers', () => {
  it('detects sorted arrays', () => {
    expect(isSorted([])).toBe(true);
    expect(isSorted([1])).toBe(true);
    expect(isSorted([1, 2, 3])).toBe(true);
    expect(isSorted([3, 2, 1])).toBe(false);
  });

  it('performs one bubble sort pass', () => {
    expect(bubbleSortPass([3, 1, 2])).toEqual([1, 2, 3]);
    expect(bubbleSortPass([5, 4, 3, 2, 1])).toEqual([4, 3, 2, 1, 5]);
  });
});
