import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (result, format) => {
  switch (format) {
    case 'stylish':
      return stylish(result);
    case 'plain':
      return plain(result);
    case 'json':
      return JSON.stringify(result);
    default:
      throw Error(`incorrect format "${format}"`);
  }
};

export default formatter;
