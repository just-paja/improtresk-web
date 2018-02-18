import { getProgress } from 'react-saga-rest';

import { getYearListState } from '../../years/selectors';
import { getNewsListState } from '../../news/selectors';
import { getTextState } from '../../texts/selectors';

import * as texts from '../../texts/constants';

export const getHomeProgress = getProgress(
  getYearListState,
  getNewsListState,
  getTextState(texts.ABOUT_FESTIVAL_SHORT)
);

export default { getHomeProgress };
