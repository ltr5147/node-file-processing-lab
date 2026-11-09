const path = require('node:path');
const {
  calculateSum,
  findHighest,
  findLowest,
  calculateAverage,
  parseNumbers,
  processNumberFile,
} = require('../src/numberProcessor');

test('sums negative, positive, and decimal values', () => {
  expect(calculateSum([12, -4, 8.5, 3.5, 0])).toBe(20);
});

test('finds the highest value in an all-negative list', () => {
  expect(findHighest([-12, -3, -8])).toBe(-3);
});

test('finds the lowest value in an all-positive list', () => {
  expect(findLowest([9, 2, 6])).toBe(2);
});

test('calculates an average without rounding to an integer', () => {
  expect(calculateAverage([2, 3, 5])).toBeCloseTo(10 / 3);
});

test('handles a list with a single value', () => {
  expect(findHighest([-2])).toBe(-2);
  expect(findLowest([-2])).toBe(-2);
  expect(calculateAverage([-2])).toBe(-2);
});

test('uses zero for the empty sum and null for undefined statistics', () => {
  expect(calculateSum([])).toBe(0);
  expect(findHighest([])).toBeNull();
  expect(findLowest([])).toBeNull();
  expect(calculateAverage([])).toBeNull();
});

test('parses numbers on separate lines and skips blank lines', () => {
  expect(parseNumbers(' 3.5\r\n\r\n-2\r\n0\r\n')).toEqual([3.5, -2, 0]);
});

test.each(['2 apples', 'Infinity', '1,2', '0x10'])('rejects invalid input %s and reports its line', (input) => {
  expect(() => parseNumbers('1\n\n' + input)).toThrow(/line 3/i);
});

test('reads and processes the sample numbers file', () => {
  const file = path.join(__dirname, '..', 'data', 'sample-numbers.txt');
  expect(processNumberFile(file)).toEqual({ sum: 20, highest: 12, lowest: -4, average: 4 });
});
