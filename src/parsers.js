const parsers = {
  json: JSON.parse,
  // yml: ??????
};

const getParsedContent = (fileData, extension) => parsers[extension](fileData);

export default getParsedContent;
