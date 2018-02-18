import { getProgress } from 'react-saga-rest';

import { getMealListState } from '../../food/selectors';
import { getTextState } from '../../texts/selectors';

import * as texts from '../../texts/constants';

export const getFoodPageProgress = getProgress(
  getMealListState,
  getTextState(texts.FOOD_INTRO)
);

export default { getFoodPageProgress };
