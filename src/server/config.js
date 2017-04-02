const defaultConfig = {
  logLevel: process.env.NODE_LOG_LEVEL || 'info',
  port: process.env.NODE_PORT || 3000,
  proxy: process.env.NODE_AS_PROXY || false,
  apiSource: process.env.NODE_API_URL ||
    'http://localhost:8000/api',
  apiAuthSource: process.env.NODE_API_AUTH_URL ||
    'http://localhost:8000/o',
  apiId: process.env.NODE_API_CLIENT_ID ||
    'development-client-id',
  apiSecret: process.env.NODE_API_CLIENT_SECRET ||
    'development-client-secret',
};

export default (userConfig = {}) => ({ ...defaultConfig, ...userConfig });
