import { getProgress } from 'react-saga-rest';

import { getConditionsState, getYearListState } from '../../years/selectors';

export const getConditionsPageProgress = getProgress(
  getConditionsState,
  getYearListState
);

export default { getConditionsPageProgress };
