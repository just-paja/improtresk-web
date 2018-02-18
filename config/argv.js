// eslint-disable-next-line import/no-extraneous-dependencies
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'API_URI', defaultValue: 'http://localhost:8001' },
  { name: 'env' },
  { name: 'coverage' },
];

const options = commandLineArgs(optionDefinitions);
process.env.API_URI = options.API_URI;
