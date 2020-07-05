const gendiff = (original, compare) => {
  const diff = [];
  const diffKeys = new Set(Object.keys(original).concat(Object.keys(compare)));

  // eslint-disable-next-line no-restricted-syntax
  for (const key of diffKeys) {
    if (key in original) {
      if (original[key] === compare[key]) {
        diff.push(`    ${key}: ${original[key]}`);
      } else {
        diff.push(`  - ${key}: ${original[key]}`);

        if (key in compare) {
          diff.push(`  + ${key}: ${compare[key]}`);
        }
      }
    } else {
      diff.push(`  + ${key}: ${compare[key]}`);
    }
  }
  return `{\n${diff.join('\n')}\n}`;
};

export default gendiff;
