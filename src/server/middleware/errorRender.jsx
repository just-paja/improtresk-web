import React from 'react';
import winston from 'winston';

import NotFound from '../../web/components/notFound';
import GeneralError from '../../web/components/generalError';

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

  return renderMarkupAndWait(req, store, componentTree)
    .then(markupAndState => respondWithHtml(req, res, markupAndState));
};

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  if (res.statusCode === 200) {
    res.status(404);
  }

  try {
    return renderAndRespond(req, res, getTemplate(res.statusCode));
  } catch (e) {
    winston.log('error', e);
    return res.status(500).send('Internal server errror');
  }
};
