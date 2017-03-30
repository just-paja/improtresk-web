import express from 'express';

export default () => {
  const app = express();

  app.use('/theme', express.static('static'));
  app.use('/font-awesome', express.static('node_modules/font-awesome'));
  app.use('/bootswatch', express.static('node_modules/bootswatch'));

  return app;
};
