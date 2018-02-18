import { getProgress } from 'react-saga-rest';

import { getAccomodationListState } from '../../accomodation/selectors';
import { getCapacityState } from '../../years/selectors';
import { getTextState } from '../../texts/selectors';

import * as texts from '../../texts/constants';

export const getAccomodationPageProgress = getProgress(
  getAccomodationListState,
  getCapacityState,
  getTextState(texts.ACCOMODATION_INTRO)
);

export default { getAccomodationPageProgress };
