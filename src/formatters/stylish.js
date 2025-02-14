import _ from 'lodash';

const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);
const getBracketIndent = (depth, spacesCount = 4) => ' '.repeat((depth - 1) * spacesCount);

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);;
  }
  const lines = Object.entries(value).map(
    ([key, val]) => `${getIndent(depth + 1)}  ${key}: ${formatValue(val, depth + 1)}`
  );
  return `{\n${lines.join('\n')}\n${getBracketIndent(depth + 1)}}`;
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
        return `${getIndent(depth)}  ${key}: {\n${stylish(children, depth + 1)}\n${getBracketIndent(depth + 1)}}`;
      default:
        throw new Error(`Incorrect type: ${type}`);
    }
  });
  return lines.join('\n');
};

export default (diffTree) => `{\n${stylish(diffTree)}\n}`;