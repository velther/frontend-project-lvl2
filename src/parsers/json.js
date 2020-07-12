const test = (filePath) => /\.json$/.test(filePath);
const parse = (rawData) => JSON.parse(rawData);

export default { test, parse };
