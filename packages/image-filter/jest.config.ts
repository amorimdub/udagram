const { name: packageName } = require('./package.json');

module.exports = {
  displayName: packageName,
  name: packageName,
  preset: 'ts-jest'
};
