import createFetchSaga from '../../sagas/createFetchSaga';

import { roomLeave } from '../actions';
import { getRoomSelection } from '../selectors';

export default createFetchSaga(roomLeave, {
  payloadSelector: getRoomSelection,
  payloadReducer: roomId => ({ roomId }),
});
