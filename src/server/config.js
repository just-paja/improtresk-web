const defaultConfig = {
  logLevel: process.env.NODE_LOG_LEVEL || 'info',
  port: process.env.NODE_PORT || 3000,
  proxy: process.env.NODE_AS_PROXY || false,
  apiSource: process.env.NODE_API_URL ||
    'https://private-6502a9-improtreskapi.apiary-mock.com/api',
  apiAuthSource: process.env.NODE_API_AUTH_URL ||
    'private-6502a9-improtreskapi.apiary-mock.com/o/token',
  apiId: process.env.NODE_API_CLIENT_ID,
  apiSecret: process.env.NODE_API_CLIENT_SECRET,
};

export default (userConfig = {}) => ({ ...defaultConfig, ...userConfig });
