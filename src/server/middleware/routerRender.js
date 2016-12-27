import { match } from 'react-router';

import configureRoutes from '../../web/routes';

import { renderAndRespond } from './renderReact';

const routes = configureRoutes();

const isNotFound = renderProps => renderProps.routes.some(route => route.path === '*');

export default (req, res, next) => match(
  { routes, location: req.url },
  (error, redirectLocation, renderProps) => {
    if (error) {
      throw error;
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (renderProps && !isNotFound(renderProps)) {
      return renderAndRespond(req, res, renderProps);
    }

    return next();
  });
