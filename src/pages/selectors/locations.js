import { getProgress } from 'react-saga-rest';

import { getLocationsState } from '../../workshops/selectors';

export const getLocationsPageProgress = getProgress(
  getLocationsState
);

export default { getLocationsPageProgress };
