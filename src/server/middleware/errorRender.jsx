import React from 'react'

import { renderToString } from 'react-dom/server'

import logger from '../logger'
import NotFound from '../../pages/NotFound'
import GeneralError from '../../components/GeneralError'

import {
  getStore,
  respondWithHtml
} from './renderReact'

const templateMap = {
  404: NotFound
}

const getTemplate = status => templateMap[status] || GeneralError

const handleError = res => error => {
  logger.info('render error failed')
  logger.error(error)
  return res.status(500).send('Internal server errror')
}

export const renderAndRespond = (req, res, ErrorComponent) => {
  const store = getStore(req)
  const componentTree = <ErrorComponent />

  logger.info(`render error: ${req.url}`)
  try {
    return Promise.resolve(respondWithHtml(req, res, {
      markup: renderToString(componentTree),
      state: store.getState()
    }))
  } catch (e) {
    return Promise.reject(e)
  }
}

export default (err, req, res, next) => {
  res.status(500)
  if (res.statusCode === 200) {
    res.status(404)
  }

  logger.info('render error general')
  logger.error(err)

  try {
    return renderAndRespond(req, res, getTemplate(res.statusCode))
      .catch(handleError(res))
  } catch (e) {
    logger.error(e)
    return res.status(500).send('Internal server errror')
  }
}
