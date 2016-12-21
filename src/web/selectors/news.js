import { createSelector } from 'reselect';

const getNewsState = state => state.news;

export const newsAll = createSelector(getNewsState, news => news.data);

export default { newsAll };
