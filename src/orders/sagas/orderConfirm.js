import { orderConfirm } from '../actions';
import { getActiveOrder } from '../selectors';

import createFetchSaga from '../../sagas/createFetchSaga';

export default createFetchSaga(orderConfirm, {
  payloadSelector: getActiveOrder,
  payloadReducer: order => ({ order: order.id }),
});
