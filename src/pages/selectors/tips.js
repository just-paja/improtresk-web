import { getProgress } from 'react-saga-rest';

import { getTipListState } from '../../texts/selectors';

export const getTipListPageProgress = getProgress(
  getTipListState
);

export default { getTipListPageProgress };
