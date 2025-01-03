import fs from 'fs';
import path from 'path';
import parseFile from './index.js';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

  const output = keys.map((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {

      if (_.isEqual(obj1[key], obj2[key])) {
        return `    ${key}: ${obj1[key]}`;
      }
      return [
        `  - ${key}: ${obj1[key]}`,
        `  + ${key}: ${obj2[key]}`,
      ].join('\n');
    }
    if (_.has(obj1, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }
    return `  + ${key}: ${obj2[key]}`;
  });

  return `{\n${output.join('\n')}\n}`;
};

export default genDiff;
