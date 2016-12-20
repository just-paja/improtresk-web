import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';

import routerRender from './middleware/routerRender';
import errorRender from './middleware/errorRender';
import staticMiddleware from './middleware/static';

const defaultConfig = {
  logLevel: 'info',
  port: 3000,
};

export default function server(userConfig = {}) {
  const app = express();
  const config = { ...defaultConfig, ...userConfig };

  winston.level = config.logLevel;

  app.use('/static', staticMiddleware);

  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/json' }));

  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line global-require
    app.use(require('./middleware/dev').default);
  }

  app.use(routerRender);
  app.use(errorRender);

  const promise = app.listen(defaultConfig.port);
  winston.log('info', `Started server on port ${defaultConfig.port}`);
  return promise;
}
