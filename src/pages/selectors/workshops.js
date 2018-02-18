import { getProgress } from 'react-saga-rest';

import {
  getWorkshopDetailState,
  getWorkshopListState,
} from '../../workshops/selectors';
import { getCapacityState } from '../../years/selectors';

export const getWorkshopsPageProgress = getProgress(
  getWorkshopListState,
  getCapacityState
);

export const getWorkshopDetailPageProgress = getProgress(
  getWorkshopDetailState
);
