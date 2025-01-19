import fs from 'fs';
import path from 'path';
import buildDiff from './compare.js';
import parse from './parsers.js';

const getFileExtension = (filePath) => path.extname(filePath).slice(1);

const genDiff = (filePath1, filePath2) => {
  const firstFilePath = path.resolve(process.cwd(), filePath1);
  const secondFilePath = path.resolve(process.cwd(), filePath2);

  const fileOneContentData = fs.readFileSync(firstFilePath, 'utf-8');
  const fileTwoContentData = fs.readFileSync(secondFilePath, 'utf-8');

  // const firstFileExtension = ???
  // secondFileExtension = ???
  const fileExtension1 = getFileExtension(filePath1);
  const fileExtension2 = getFileExtension(filePath2);

  const obj1 = parse(fileOneContentData, fileExtension1);
  const obj2 = parse(fileTwoContentData, fileExtension2);

  // const test = buildDiff(fileOneContentData, fileTwoContentData)
  return buildDiff(obj1, obj2);

};

export default genDiff;
