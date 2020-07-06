/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fixturesPath = resolve(__dirname, join('..', '__fixtures__'));

describe('check diff function', () => {
  it('should compare objects correctly', () => {
    const originalJson = JSON.parse(fs.readFileSync(join(fixturesPath, 'json', 'flat', 'original.json')));
    const compareJson = JSON.parse(fs.readFileSync(join(fixturesPath, 'json', 'flat', 'compare.json')));
    const resultDiff = fs.readFileSync(join(fixturesPath, 'json', 'flat', 'result.diff'), 'utf-8');

    expect(gendiff(originalJson, compareJson)).toBe(resultDiff);
  });

  it('should compare arrays correctly', () => {
    const originalJson = JSON.parse(fs.readFileSync(join(fixturesPath, 'json', 'flat', 'original-array.json')));
    const compareJson = JSON.parse(fs.readFileSync(join(fixturesPath, 'json', 'flat', 'compare-array.json')));
    const resultDiff = fs.readFileSync(join(fixturesPath, 'json', 'flat', 'result-array.diff'), 'utf-8');

    expect(gendiff(originalJson, compareJson)).toBe(resultDiff);
  });
});
