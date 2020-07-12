import fs from 'fs';

import jsonParser from './json.js';
import yamlParser from './yaml.js';

const parsers = [jsonParser, yamlParser];

const parseFile = (filePath) => {
  const fileContents = fs.readFileSync(filePath);

  // eslint-disable-next-line no-restricted-syntax
  for (const parser of parsers) {
    if (parser.test(filePath)) {
      return parser.parse(fileContents);
    }
  }

  throw new Error('Unknow file format');
};

export default parseFile;
