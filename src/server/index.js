import deviceMiddleware from 'express-device';
import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';

import configure from './config';
import routerRender from './middleware/routerRender';
import errorRender from './middleware/errorRender';
import staticMiddleware from './middleware/static';

export default function server(userConfig = {}) {
  const app = express();
  const config = configure(userConfig);

  winston.level = config.logLevel;

  app.use('/static', staticMiddleware);

  if (process.env.NODE_ENV === 'production') {
    app.use('/assets', express.static('dist/frontend'));
  }

  app.use(deviceMiddleware.capture());
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/json' }));

  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line global-require
    app.use(require('./middleware/dev').default);
  }

  app.use(routerRender);
  app.use(errorRender);

  app.ready = new Promise((resolve) => {
    app.server = app.listen(config.port, () => {
      winston.log('info', `Started server on port ${config.port}`);
      resolve();
    });
  });

  return app;
}
