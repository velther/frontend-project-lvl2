import path from 'path';

import parseFile from './parsers/index.js';

const formatMessage = (key, value, isArray, sign = ' ') => `  ${sign} ${isArray ? '' : `${key}: `}${value}`;

const compareParsedStructures = (original, compare) => {
  const isArray = Array.isArray(original) && Array.isArray(compare);
  const quotes = isArray ? '[]' : '{}';
  const diff = [];
  const diffKeys = new Set(Object.keys(original).concat(Object.keys(compare)));

  // eslint-disable-next-line no-restricted-syntax
  for (const key of diffKeys) {
    if (key in original) {
      if (original[key] === compare[key]) {
        diff.push(formatMessage(key, original[key], isArray));
      } else {
        diff.push(formatMessage(key, original[key], isArray, '-'));

        if (key in compare) {
          diff.push(formatMessage(key, compare[key], isArray, '+'));
        }
      }
    } else {
      diff.push(formatMessage(key, compare[key], isArray, '+'));
    }
  }
  return `${quotes[0]}\n${diff.join('\n')}\n${quotes[1]}`;
};

const gendiff = (filepath1, filepath2) => {
  const resolvedPath1 = path.resolve(process.cwd(), filepath1);
  const resolvedPath2 = path.resolve(process.cwd(), filepath2);

  const parsedContents1 = parseFile(resolvedPath1);
  const parsedContents2 = parseFile(resolvedPath2);

  return compareParsedStructures(parsedContents1, parsedContents2);
};

export default gendiff;
