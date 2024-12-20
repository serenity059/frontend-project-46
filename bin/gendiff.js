#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from '../src/parsers.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const file1Data = parseFile(filepath1);
    const file2Data = parseFile(filepath2);

    console.log('Parsed data from first file:', file1Data);
    console.log('Parsed data from second file:', file2Data);
  });

program.parse(process.argv);
