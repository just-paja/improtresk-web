import createYearFetchSaga from '../../years/sagas/createYearFetchSaga';

import { performerDetailFetch } from '../actions';
import { getPerformerDetailId } from '../selectors';

export default createYearFetchSaga(performerDetailFetch, {
  payloadSelector: getPerformerDetailId,
  payloadReducer: performer => ({ performer }),
});
