import { createSelector } from 'reselect';

import { isStateValid } from './common';

import { aggregateNewsData } from '../transformers/news';

const getNewsListState = state => state.news.list;
const getNewsDetailState = state => state.news.detail;

export const newsAll = createSelector(getNewsListState, news => news.data);

export const getNewsDetailId = createSelector(
  getNewsDetailState,
  detail => detail.id
);

export const getNewsDetail = createSelector(
  getNewsDetailState,
  detail => aggregateNewsData(detail.data)
);

export const shouldFetchList = createSelector(getNewsListState, isStateValid);
export const shouldFetchDetail = createSelector(getNewsDetailState,
  detail =>
    isStateValid(detail) &&
    Number(detail.id) === Number(detail.data.id)
  );

export default { newsAll };
