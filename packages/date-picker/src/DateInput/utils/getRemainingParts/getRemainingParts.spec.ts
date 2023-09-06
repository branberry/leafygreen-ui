import { getRemainingParts } from '.';

describe('packages/date-picker/date-input/utils/getRemainingParts', () => {
  // * `getRemainingParts(right, 2, [a,b,c,d,e]) => [d,e]`
  // *
  // * `getRemainingParts(left, 2, [a,b,c,d,e]) => [b,a]`
  test('right', () => {
    const parts = getRemainingParts('right', 2, ['a', 'b', 'c', 'd', 'e']);
    expect(parts).toHaveLength(2);
    expect(parts).toEqual(expect.arrayContaining(['d', 'e']));
  });

  test('left', () => {
    const parts = getRemainingParts('left', 2, ['a', 'b', 'c', 'd', 'e']);
    expect(parts).toHaveLength(2);
    expect(parts).toEqual(expect.arrayContaining(['b', 'a']));
  });
});
