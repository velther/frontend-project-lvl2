import path from 'path';
import { readFileSync } from 'fs';

import commander from 'commander';

import gendiff from './index.js';

const { program } = commander;

const { version } = JSON.parse(readFileSync(path.join(process.cwd(), './package.json')));

const cli = () => {
  program
    .version(version)
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      console.log(gendiff(filepath1, filepath2));
    });

  program.parse(process.argv);
};

export default cli;
