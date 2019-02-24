import { orderCancel } from '../actions'
import { getActiveOrder } from '../selectors'

import createFetchSaga from '../../sagas/createFetchSaga'

export default createFetchSaga(orderCancel, {
  payloadSelector: getActiveOrder,
  payloadReducer: order => ({ order: order.id })
})
