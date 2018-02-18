import newsDetail from './newsDetail';
import newsList from './newsList';

export * from './newsDetail';
export * from './newsList';

export default [
  ...newsDetail,
  ...newsList,
];
