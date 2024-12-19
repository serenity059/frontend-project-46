#!/usr/bin/env node

const { Command } = require('commander');

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);
