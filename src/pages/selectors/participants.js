import { getProgress } from 'react-saga-rest';

import { getParticipantDetailState } from '../../participants/selectors';

export const getParticipantHomeProgress = getProgress(
  getParticipantDetailState
);

export default { getParticipantHomeProgress };
