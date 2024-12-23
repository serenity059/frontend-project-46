import fs from 'fs';
import path from 'path';

const parseFile = (filePath, secondPath) => {
  const firstFilePath = path.resolve(process.cwd(), filePath);
  const secondFilePath = path.resolve(process.cwd(), secondPath);
  const fileOneContentData = fs.readFileSync(firstFilePath, 'utf-8');
  const fileTwoContentData = fs.readFileSync(secondFilePath, 'utf-8');

  console.log('Parsed data from first file:', fileOneContentData);
  console.log('Parsed data from second file:', fileTwoContentData);

};

export default parseFile;
