import createFetchSaga from '../../sagas/createFetchSaga'

import { yearDetailFetch } from '../actions'
import { getArchiveState } from '../selectors/yearArchive'

export default createFetchSaga(yearDetailFetch, {
  payloadSelector: getArchiveState,
  payloadReducer: state => ({ year: state.current })
})
