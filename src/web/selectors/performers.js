import { createSelector } from 'reselect';

import { isStateValid } from './common';

import { aggregatePerformerData } from '../transformers/performers';

const getPerformersDetailState = state => state.performers.detail;
const getPerformersListState = state => state.performers.list;

export const getPerformers = createSelector(
  getPerformersListState,
  performers => performers.data.map(aggregatePerformerData)
);

export const shouldFetchPerformers = createSelector(
  getPerformersListState,
  isStateValid
);

export const getPerformerDetailId = createSelector(
  getPerformersDetailState,
  state => state.id
);

export const getPerformerDetail = createSelector(
  getPerformersDetailState,
  performer => aggregatePerformerData(performer.data)
);

export const shouldFetchDetail = createSelector(
  [getPerformersDetailState, getPerformerDetailId],
  (detail, id) => isStateValid(detail) && detail.data.id === id
);
