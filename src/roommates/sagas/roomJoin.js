import createFetchSaga from '../../sagas/createFetchSaga';

import { roomJoin } from '../actions';
import { getRoomSelection } from '../selectors';

export default createFetchSaga(roomJoin, {
  payloadSelector: getRoomSelection,
  payloadReducer: roomId => ({ roomId }),
});
