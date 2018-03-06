import { getProgress } from 'react-saga-rest';

import { getPerformersListState } from '../../performers/selectors';
import { getScheduleEventListState } from '../../schedule/selectors';

export const getScheduleProgress = getProgress(
  getPerformersListState,
  getScheduleEventListState
);

export default { getScheduleProgress };
