#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from '../src/index.js';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const [file1, file2] = parseFile(filepath1, filepath2);
    const difference = genDiff(file1, file2);
    console.log(difference);
  });

program.parse(process.argv);
