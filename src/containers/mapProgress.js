import { mapContainerProgress } from 'react-saga-rest'

import NotFound from '../components/NotFound'
import ResourceError from '../components/ResourceError'
import ResourceLoader from '../components/ResourceLoader'

export default (pageComponent, props) => mapContainerProgress(pageComponent, {
  NotFoundComponent: NotFound,
  ErrorComponent: ResourceError,
  LoaderComponent: ResourceLoader,
  ...props
})
