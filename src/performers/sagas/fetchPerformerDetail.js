import createYearFetchSaga from '../../years/sagas/createYearFetchSaga'

import { performerDetailFetch } from '../actions'
import { getPerformersDetailState, getPerformerDetailId } from '../selectors'

export default createYearFetchSaga(performerDetailFetch, {
  payloadSelector: getPerformerDetailId,
  payloadReducer: performer => ({ performer }),
  stateSelector: getPerformersDetailState
})
