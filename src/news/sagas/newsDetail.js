import createFetchSaga from '../../sagas/createFetchSaga';

import { getNewsDetailId } from '../selectors';
import { newsDetailFetch } from '../actions';

export default createFetchSaga(newsDetailFetch, {
  payloadSelector: getNewsDetailId,
  payloadReducer: newsId => ({ newsId }),
});
