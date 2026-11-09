const { readFileSync } = require('node:fs');
const path = require('node:path');

function getWords(text) {
  // Keep apostrophes and hyphens inside words, but skip surrounding punctuation.
  return text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) ?? [];
}

function countWords(text) {
  return getWords(text).length;
}

function findLongestWord(text) {
  let longest = '';
  for (const word of getWords(text)) {
    if (word.length > longest.length) {
      longest = word;
    }
  }
  return longest;
}

function countLines(text) {
  if (text === '') {
    return 0;
  }

  const lines = text.split(/\r\n|\n|\r/);
  // A newline at the end terminates the last line without adding a new one.
  return lines.at(-1) === '' ? lines.length - 1 : lines.length;
}

function analyzeTextFile(filePath) {
  const text = readFileSync(filePath, 'utf8');
  return {
    words: countWords(text),
    longestWord: findLongestWord(text),
    lines: countLines(text),
  };
}

module.exports = { countWords, findLongestWord, countLines, analyzeTextFile };

// Run the examples only when this script is called directly.
if (require.main === module) {
  const inputs = process.argv.slice(2);
  const sampleFiles = ['quotes.txt', 'sample-text.txt'].map((name) =>
    path.join(__dirname, '..', 'data', name)
  );
  const files = inputs.length ? inputs : sampleFiles;

  for (const file of files) {
    try {
      const { words, longestWord, lines } = analyzeTextFile(file);
      console.log(path.basename(file));
      console.log('Words:', words);
      console.log('Longest word:', longestWord || '(none)');
      console.log('Lines:', lines);
    } catch (error) {
      console.error(`Could not analyze "${file}": ${error.message}`);
      process.exitCode = 1;
    }
  }
}
