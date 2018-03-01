import { getProgress } from 'react-saga-rest';

import { getNewsDetailState, getNewsListState } from '../../news/selectors';

export const getNewsDetailProgress = getProgress(
  getNewsDetailState,
  getNewsListState
);

export default { getNewsDetailProgress };
