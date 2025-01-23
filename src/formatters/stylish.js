import _ from 'lodash';

const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);
const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lines = Object.entries(value).map(
    ([key, val]) => `${getIndent(depth + 1)} ${key}: ${formatValue(val, depth + 1)}`
  );
  return `{
${lines.join('\n')}
${getIndent(depth)}  }`;
};

const stylish = (diffTree, depth = 1) => {
  const lines = diffTree.map(({key, type, value, oldValue, newValue, children}) =>{
    switch (type) {
      case 'added':
        return `${getIndent(depth)}+ ${key}: ${formatValue(value, depth)}`;
      case 'removed':
        return `${getIndent(depth)}- ${key}: ${formatValue(value, depth)}`;
      case 'unchanged':
        return `${getIndent(depth)}  ${key}: ${formatValue(value, depth)}`;
      case 'changed':
        return `${getIndent(depth)}- ${key}: ${formatValue(oldValue, depth)}\n${getIndent(depth)}+ ${key}: ${formatValue(newValue, depth)}`;
      case 'nested':
        return `${getIndent(depth)}  ${key}: {
${stylish(children, depth + 1)}
${getIndent(depth)}  }`;
      default:
        throw new Error(`Incorrect type: ${type}`);
    }
  });
  return lines.join('\n');
};

export default (diffTree) => `{
${stylish(diffTree)}
}`;