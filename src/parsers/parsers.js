import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load
};

const getParsedContent = (fileData, extension) => parsers[extension](fileData);

export default getParsedContent;
