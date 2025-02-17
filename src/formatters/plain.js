const formatValue = (value) => {
  if (value == null) {
    return String(null);
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const renderPlain = (content) => {
  const iter = (node, ancestry) => {
    const nestedPath = [...ancestry, node.key];
    const path = nestedPath.join('.');
    if (node.state === 'added') {
      return `Property '${path}' was added with value: ${formatValue(node.value)}`;
    }
    if (node.state === 'deleted') {
      return `Property '${path}' was removed`;
    }
    if (node.state === 'changed') {
      return `Property '${path}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
    }
    if (node.state === 'unchanged') {
      return [];
    }
    return node.children.flatMap((children) => iter(children, nestedPath));
  };
  return content
    .flatMap((node) => iter(node, []))
    .join('\n');
};

export default renderPlain;
