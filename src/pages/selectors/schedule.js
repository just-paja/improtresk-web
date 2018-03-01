import { getProgress } from 'react-saga-rest';

import { getPerformersListState } from '../../performers/selectors';
import { getScheduleEventListState } from '../../schedule/selectors';
import { getTextState } from '../../texts/selectors';

import * as texts from '../../texts/constants';

export const getScheduleProgress = getProgress(
  getPerformersListState,
  getScheduleEventListState,
  getTextState(texts.SCHEDULE_INTRO)
);

export default { getScheduleProgress };
