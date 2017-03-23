import { aggregatePollData } from './polls';

// eslint-disable-next-line import/prefer-default-export
export const aggregateNewsData = news => (
  news && news.poll ? {
    ...news,
    poll: aggregatePollData(news.poll),
  } : news
);
