import React from 'react';
import winston from 'winston';

import { renderToString } from 'react-dom/server';

import NotFound from '../../web/components/notFound';
import GeneralError from '../../web/components/generalError';

import { renderInHtml } from './renderReact';

const templateMap = {
  404: NotFound,
};

const getTemplate = status => templateMap[status] || GeneralError;

export default (req, res, next) => {
  if (res.statusCode === 200) {
    res.status(404);
  }

  const ErrorComponent = getTemplate(res.statusCode);

  try {
    const html = renderInHtml({
      markup: renderToString(<ErrorComponent />),
    });
    res.send(html);
  } catch (e) {
    winston.log('error', e);
    return res.status(500).send('Internal server errror');
  }

  return next();
};
