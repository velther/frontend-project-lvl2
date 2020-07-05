import path from 'path';
import fs from 'fs';

import gendiff from './index.js';

const runAction = (filepath1, filepath2) => {
  const resolvedPath1 = path.resolve(process.cwd(), filepath1);
  const resolvedPath2 = path.resolve(process.cwd(), filepath2);

  const parsedContents1 = JSON.parse(fs.readFileSync(resolvedPath1));
  const parsedContents2 = JSON.parse(fs.readFileSync(resolvedPath2));
  console.log(gendiff(parsedContents1, parsedContents2));
};

export default runAction;