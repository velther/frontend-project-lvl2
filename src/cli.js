import path from 'path';
import { readFileSync } from 'fs';

import commander from 'commander';

import runAction from './run-action.js';

const { program } = commander;

const { version } = JSON.parse(readFileSync(path.join(process.cwd(), './package.json')));

const cli = () => {
  program
    .version(version)
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action(runAction);

  program.parse(process.argv);
};

export default cli;
