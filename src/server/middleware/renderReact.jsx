import React from 'react';
import winston from 'winston';

import { RouterContext } from 'react-router';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import pageBase from '../components/pageBase';

export const renderMarkup = renderProps => renderToString(<RouterContext {...renderProps} />);

export const renderInHtml = markup => renderToStaticMarkup(pageBase({ markup }));

export const respondWithHtml = (req, res, markup) => {
  try {
    return res.send(renderInHtml(markup));
  } catch (e) {
    winston.log('error', e);
  }

  return res.status(500).send('Internal server error');
};

export const renderAndRespond = (req, res, renderProps) =>
  respondWithHtml(req, res, renderMarkup(renderProps));
