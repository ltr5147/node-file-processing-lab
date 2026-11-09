const path = require('node:path');
const { countWords, findLongestWord, countLines, analyzeTextFile } = require('../src/textAnalyzer');

describe('countWords', () => {
  test('counts words separated by mixed whitespace', () => {
    expect(countWords('  Read\tthen\nwrite.  ')).toBe(3);
  });

  test('returns zero for whitespace or punctuation alone', () => {
    expect(countWords('  \n\t ...')).toBe(0);
  });

  test('keeps contractions and hyphenated words together', () => {
    expect(countWords("Don't skip the step-by-step guide.")).toBe(5);
  });
});

describe('findLongestWord', () => {
  test('finds the longest word without surrounding punctuation', () => {
    expect(findLongestWord('A "programming" exercise.')).toBe('programming');
  });

  test('returns the first word when lengths tie', () => {
    expect(findLongestWord('first, later!')).toBe('first');
  });

  test('returns an empty string when no words exist', () => {
    expect(findLongestWord('!')).toBe('');
  });
});

describe('countLines', () => {
  test('counts blank lines and supports Windows line endings', () => {
    expect(countLines('one\r\n\r\nthree\r\n')).toBe(3);
  });

  test('counts the last line with or without a final newline', () => {
    expect(countLines('one\ntwo')).toBe(2);
    expect(countLines('one\ntwo\n')).toBe(2);
  });

  test('distinguishes an empty file from a blank line', () => {
    expect(countLines('')).toBe(0);
    expect(countLines('\n')).toBe(1);
  });
});

test('reads and analyzes a UTF-8 sample file', () => {
  const file = path.join(__dirname, '..', 'data', 'sample-text.txt');
  expect(analyzeTextFile(file)).toEqual({ words: 14, longestWord: 'programming', lines: 3 });
});
