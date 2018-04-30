process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

require('../config/argv');

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({ silent: true });

// eslint-disable-next-line import/no-extraneous-dependencies
const jest = require('jest');

const argv = process.argv.slice(2);

if (argv.indexOf('--coverage') < 0) {
  argv.push('--watch');
}
argv.push('--maxWorkers=3');

jest.run(argv);
