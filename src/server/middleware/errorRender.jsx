import React from 'react';
import winston from 'winston';

import NotFound from '../../pages/NotFound';
import GeneralError from '../../components/GeneralError';

import {
  getStore,
  renderMarkupAndWait,
  respondWithHtml,
} from './renderReact';

const templateMap = {
  404: NotFound,
};

const getTemplate = status => templateMap[status] || GeneralError;

export const renderAndRespond = (req, res, ErrorComponent) => {
  const store = getStore(req);
  const componentTree = <ErrorComponent />;

  winston.log('silly', 'RENDER ERROR', req.url);
  return renderMarkupAndWait(req, store, componentTree)
    .then(markupAndState => respondWithHtml(req, res, markupAndState))
    .catch((error) => {
      winston.log('error', error);
      return res.status(500).send('Internal server errror');
    });
};

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  res.status(500);
  if (res.statusCode === 200) {
    res.status(404);
  }

  winston.log('error', err);

  try {
    return renderAndRespond(req, res, getTemplate(res.statusCode));
  } catch (e) {
    winston.log('error', e);
    return res.status(500).send('Internal server errror');
  }
};
