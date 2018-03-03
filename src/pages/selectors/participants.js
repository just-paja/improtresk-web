import { getProgress } from 'react-saga-rest';

import { getOrderListState } from '../../orders/selectors';

export const getParticipantHomeProgress = getProgress(
  getOrderListState
);

export default { getParticipantHomeProgress };
