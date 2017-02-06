import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getNewsListState = state => state.news.list;
const getNewsDetailState = state => state.news.detail;

export const newsAll = createSelector(getNewsListState, news => news.data);

export const getNewsDetail = createSelector(getNewsDetailState, detail => detail.data);

export const shouldFetchList = createSelector(getNewsListState, isStateValid);
export const shouldFetchDetail = createSelector(getNewsDetailState,
  detail => isStateValid(detail) && detail.id === detail.data.id);

export default { newsAll };
