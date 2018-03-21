import * as constants from '../constants';
import * as api from '../../api';

import { createRoutine } from '../../routines';

export const newsDetailFetch = createRoutine(constants.NEWS_DETAIL_FETCH, api.fetchNewsDetail);
export const newsListFetch = createRoutine(constants.NEWS_LIST_FETCH, api.fetchNews);
