#!/usr/bin/env node

const { Command } = require('commander');

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);
