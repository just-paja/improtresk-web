import { match } from 'react-router';

import configureRoutes from '../../web/routes';

import {
  getComponentTree,
  getStore,
  renderMarkupAndWait,
  respondWithHtml,
} from './renderReact';

const isNotFound = renderProps => renderProps.routes.some(route => route.path === '*');

export const renderAndRespond = (req, res, renderProps, store) => {
  const componentTree = getComponentTree(store, renderProps);

  return renderMarkupAndWait(req, store, componentTree)
    .then(markupAndState => respondWithHtml(req, res, markupAndState));
};

export default (req, res, next) => {
  const store = getStore(req);
  const routes = configureRoutes(store);

  return match(
    { routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      if (error) {
        throw error;
      }

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      if (renderProps) {
        if (isNotFound(renderProps)) {
          res.status(404);
        }

        return renderAndRespond(req, res, renderProps, store).catch(next);
      }

      return next();
    }
  );
};
