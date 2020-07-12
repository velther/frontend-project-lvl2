import yaml from 'js-yaml';

const test = (filePath) => /\.ya?ml$/.test(filePath);
const parse = (rawData) => yaml.safeLoad(rawData);

export default { test, parse };
