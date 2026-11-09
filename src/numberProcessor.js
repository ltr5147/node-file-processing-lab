const { readFileSync } = require('node:fs');
const path = require('node:path');

function parseNumbers(text) {
  const numbers = [];
  const lines = text.split(/\r\n|\n|\r/);
  const numericPattern = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;

  for (const [index, line] of lines.entries()) {
    const value = line.trim();
    if (value === '') {
      continue;
    }

    const number = Number(value);
    if (!numericPattern.test(value) || !Number.isFinite(number)) {
      throw new Error(`Invalid number on line ${index + 1}: "${value}"`);
    }
    numbers.push(number);
  }

  return numbers;
}

function calculateSum(numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}

function findHighest(numbers) {
  if (numbers.length === 0) {
    return null;
  }
  return numbers.reduce((highest, number) => Math.max(highest, number));
}

function findLowest(numbers) {
  if (numbers.length === 0) {
    return null;
  }
  return numbers.reduce((lowest, number) => Math.min(lowest, number));
}

function calculateAverage(numbers) {
  return numbers.length === 0 ? null : calculateSum(numbers) / numbers.length;
}

function processNumberFile(filePath) {
  const numbers = parseNumbers(readFileSync(filePath, 'utf8'));
  return {
    sum: calculateSum(numbers),
    highest: findHighest(numbers),
    lowest: findLowest(numbers),
    average: calculateAverage(numbers),
  };
}

module.exports = { parseNumbers, calculateSum, findHighest, findLowest, calculateAverage, processNumberFile };

// Run the example only when this script is called directly.
if (require.main === module) {
  const file = process.argv[2] ?? path.join(__dirname, '..', 'data', 'sample-numbers.txt');

  try {
    const { sum, highest, lowest, average } = processNumberFile(file);
    console.log(path.basename(file));
    console.log('Sum:', sum);
    console.log('Highest:', highest ?? '(none)');
    console.log('Lowest:', lowest ?? '(none)');
    console.log('Average:', average ?? '(none)');
  } catch (error) {
    console.error(`Could not process "${file}": ${error.message}`);
    process.exitCode = 1;
  }
}
