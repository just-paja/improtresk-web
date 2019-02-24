import {
  getComponentTree,
  getStore,
  renderMarkupAndWait,
  respondWithHtml
} from './renderReact'

export default (req, res, next) => {
  const store = getStore(req)
  const routerContext = {}
  const componentTree = getComponentTree(req, store, routerContext)

  return renderMarkupAndWait(req, store, componentTree)
    .then(markupAndState => respondWithHtml(req, res, markupAndState, routerContext))
    .catch(next)
}
