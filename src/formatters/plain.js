import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (diffTree, parent = '') => {
  const lines = diffTree.flatMap(({ key, type, value, oldValue, newValue, children }) => {
    const property = parent ? `${parent}.${key}` : key;
    switch (type) {
      case 'added':
        return `Property '${property}' was added with value: ${formatValue(value)}`;
      case 'removed':
        return `Property '${property}' was removed`;
      case 'changed':
        return `Property '${property}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
      case 'nested':
        return plain(children, property);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return lines.join('\n');
};

export default plain;
