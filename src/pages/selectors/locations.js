import { getProgress } from 'react-saga-rest';

import { getLocationsState } from '../../workshops/selectors';
import { getTextState } from '../../texts/selectors';

import * as texts from '../../texts/constants';

export const getLocationsPageProgress = getProgress(
  getLocationsState,
  getTextState(texts.LOCATIONS_INTRO)
);

export default { getLocationsPageProgress };
