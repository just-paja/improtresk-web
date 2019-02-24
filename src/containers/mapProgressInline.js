import { mapContainerProgress } from 'react-saga-rest'

import NotFound from '../components/NotFound'
import ResourceError from '../components/ResourceError'
import ResourceLoaderInline from '../components/ResourceLoaderInline'

export default (pageComponent, props) => mapContainerProgress(pageComponent, {
  NotFoundComponent: NotFound,
  ErrorComponent: ResourceError,
  LoaderComponent: ResourceLoaderInline,
  ...props
})
