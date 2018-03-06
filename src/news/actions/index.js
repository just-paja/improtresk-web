import * as constants from '../constants';

export const requireNewsList = () => ({ type: constants.NEWS_REQUIRED });
export const requireNewsDetail = slug => ({ type: constants.NEWS_DETAIL_REQUIRED, slug });
