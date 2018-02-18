import { mapSceneProgress } from 'react-saga-rest';

import NotFound from './NotFound';
import ResourceError from '../components/ResourceError';
import ResourceLoader from '../components/ResourceLoader';

export default (pageComponent, props) => mapSceneProgress(pageComponent, {
  NotFoundComponent: NotFound,
  ErrorComponent: ResourceError,
  LoaderComponent: ResourceLoader,
  ...props,
});
