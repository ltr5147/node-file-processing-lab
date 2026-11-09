# Node.js File Processing Lab

Logan Runyan · Application Development I: Backend

This project contains two utilities for reading and analyzing local files in Node.js. The text analyzer counts words and lines and reports the longest word. The number processor calculates the sum, highest value, lowest value, and average.

## Run the lab

From the project folder, run:

```sh
npm install
npm test
npm run analyze:text
npm run process:numbers
```

The last two commands run the sample files in `data/`. To use a different file, pass its path after `--`, for example `npm run process:numbers -- data/sample-numbers.txt`.

## Files

| File | Purpose |
| --- | --- |
| `src/textAnalyzer.js` | Reads UTF-8 text and exports the three text analysis functions. |
| `src/numberProcessor.js` | Reads one number per line and exports the four calculation functions. |
| `tests/textAnalyzer.test.js` | Tests word and line counts, longest words, and file input. |
| `tests/numberProcessor.test.js` | Tests calculations, validation, and file input. |

The text analyzer counts blank lines within a file. A trailing newline ends the last line. If two words tie for longest, the first one wins.

The number processor skips blank lines and reports the line number of invalid entries. An empty list has a sum of zero and no highest value, lowest value, or average.
