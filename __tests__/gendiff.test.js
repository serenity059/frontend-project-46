import { fileURLPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const filename = fileURLPath(import.meta.url);
const __dirname = path.dirname(filename);

const getFixturePath = (filename) => path.join(__dirname, '../__fixtures__', filename);

test('test1', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const expectedOutput = fs.readFileSync(getFixturePath('expected_flat.txt'), 'utf-8');

  const result = genDiff(filePath1, filePath2);
  expectedOutput(result).toBe(expectedOutput);
});
