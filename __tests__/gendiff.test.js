import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

const getFixturePath = (filename) => path.join(__dirname, '../__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('gendiff JSON stylish format', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const expectedOutput = readFixture('expected.txt');

  const result = genDiff(filePath1, filePath2);
  expect(result.trim()).toEqual(expectedOutput.trim());
});

test('gendiff YAML stylish format', () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');
  const expectedOutput = readFixture('expected.txt');

  const result = genDiff(filePath1, filePath2);
  expect(result.trim()).toEqual(expectedOutput.trim());
});

test('gendiff JSON plain format', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const expectedOutput = readFixture('expected_plain.txt');

  const result = genDiff(filePath1, filePath2, 'plain');
  expect(result.trim()).toEqual(expectedOutput.trim());
});
