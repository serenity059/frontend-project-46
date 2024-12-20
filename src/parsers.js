import fs from 'fs';
import path from 'path';

const parseFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(fileContent);
};

export default parseFile;
