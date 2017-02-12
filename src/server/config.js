const defaultConfig = {
  logLevel: process.env.NODE_LOG_LEVEL || 'info',
  port: process.env.NODE_PORT || 3000,
  proxy: process.env.NODE_AS_PROXY || false,
  apiSource: process.env.NODE_API_URL ||
    'https://private-6502a9-improtreskapi.apiary-mock.com/api',
};

export default (userConfig = {}) => ({ ...defaultConfig, ...userConfig });
