import { getProgress } from 'react-saga-rest';

import { getAccomodationListState } from '../../accomodation/selectors';
import { getCapacityState } from '../../years/selectors';

export const getAccomodationPageProgress = getProgress(
  getAccomodationListState,
  getCapacityState
);

export default { getAccomodationPageProgress };
