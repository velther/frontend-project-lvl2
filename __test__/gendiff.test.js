/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fixturesPath = resolve(__dirname, join('..', '__fixtures__'));

const testPaths = fs.readdirSync(fixturesPath).reduce((result, formatDirName) => {
  const formatPath = join(fixturesPath, formatDirName);

  return {
    ...result,
    [formatDirName]: fs.readdirSync(formatPath).map((typeDirName) => join(formatPath, typeDirName)),
  };
}, {});

const formats = Object.keys(testPaths);

formats.forEach((format) => testPaths[format].forEach(
  (fixtureDir) => test(fixtureDir, () => {
    const originalPath = join(fixtureDir, `original.${format}`);
    const comparePath = join(fixtureDir, `compare.${format}`);
    const resultDiff = fs.readFileSync(join(fixtureDir, 'result.diff'), 'utf-8');

    expect(gendiff(originalPath, comparePath)).toBe(resultDiff);
  }),
));
