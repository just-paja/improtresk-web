import React from 'react'

import logger from '../logger'
import NotFound from '../../pages/NotFound'
import GeneralError from '../../components/GeneralError'

import {
  getStore,
  renderMarkupAndWait,
  respondWithHtml
} from './renderReact'

const templateMap = {
  404: NotFound
}

const getTemplate = status => templateMap[status] || GeneralError

export const renderAndRespond = (req, res, ErrorComponent) => {
  const store = getStore(req)
  const componentTree = <ErrorComponent />

  logger.debug('RENDER ERROR', req.url)
  return renderMarkupAndWait(req, store, componentTree)
    .then(markupAndState => respondWithHtml(req, res, markupAndState))
    .catch((error) => {
      logger.error(error)
      return res.status(500).send('Internal server errror')
    })
}

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  res.status(500)
  if (res.statusCode === 200) {
    res.status(404)
  }

  logger.error(err)

  try {
    return renderAndRespond(req, res, getTemplate(res.statusCode))
  } catch (e) {
    logger.error(e)
    return res.status(500).send('Internal server errror')
  }
}
