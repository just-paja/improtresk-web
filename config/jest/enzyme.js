// eslint-disable-next-line import/no-extraneous-dependencies
const Enzyme = require('enzyme');
// eslint-disable-next-line import/no-extraneous-dependencies
const EnzymeAdapter = require('enzyme-adapter-react-16');

// eslint-disable-next-line import/no-extraneous-dependencies
require('jest-enzyme/lib/index.js');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });
