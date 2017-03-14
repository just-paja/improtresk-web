import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getPerformersDetailState = state => state.performers.detail;
const getPerformersListState = state => state.performers.list;

export const getPerformers = createSelector(
  getPerformersListState,
  performers => performers.data
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
  performer => performer.data
);

export const shouldFetchDetail = createSelector(
  getPerformersDetailState,
  isStateValid
);