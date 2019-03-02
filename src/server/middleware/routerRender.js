import {
  getComponentTree,
  getStore,
  renderMarkupAndWait,
  respondWithHtml
} from './renderReact'

import logger from '../logger'

export default (req, res, next) => {
  const store = getStore(req)
  const routerContext = {}
  const componentTree = getComponentTree(req, store, routerContext)

  logger.info(`render router for ${req.url}`)
  return renderMarkupAndWait(req, store, componentTree)
    .then(markupAndState => respondWithHtml(req, res, markupAndState, routerContext))
    .catch(next)
}
