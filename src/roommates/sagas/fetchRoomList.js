import createFetchSaga from '../../sagas/createFetchSaga';

import { roomListFetch } from '../actions';
import { getActiveOrder } from '../../orders/selectors';

export default createFetchSaga(roomListFetch, {
  payloadSelector: getActiveOrder,
  payloadReducer: order => ({ orderId: order.id }),
});
