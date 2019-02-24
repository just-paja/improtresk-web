import createYearFetchSaga from '../../years/sagas/createYearFetchSaga'

import { performerListFetch } from '../actions'
import { getPerformersListState } from '../selectors'

export default createYearFetchSaga(performerListFetch, {
  stateSelector: getPerformersListState
})
