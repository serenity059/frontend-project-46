import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '../__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff JSON stylish format', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const expectedOutput = readFixture('expected.txt');

  const result = genDiff(filePath1, filePath2);
  expectedOutput(result).toBe(expectedOutput);
});

test('gendiff YAML stylish format', () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.ymal');
  const expectedOutput = readFixture('expected.txt');

  const result = genDiff(filePath1, filePath2);
  expectedOutput(result).toBe(expectedOutput);
});
