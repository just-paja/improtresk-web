import { combine, changeParam, fetchStart, fetchSuccess, fetchStop, fetchFailure } from 'react-saga-rest';
import { roomJoin, roomLeave } from '../actions';

import { initialState } from '../../reducers/createFetchReducers';

export default combine(initialState, {
  [roomJoin.FAILURE]: fetchFailure,
  [roomJoin.FULFILL]: fetchStop,
  [roomJoin.REQUEST]: fetchStart,
  [roomJoin.SUCCESS]: fetchSuccess,
  [roomJoin.TRIGGER]: changeParam('room', 'payload'),
  [roomLeave.FAILURE]: fetchFailure,
  [roomLeave.FULFILL]: fetchStop,
  [roomLeave.REQUEST]: fetchStart,
  [roomLeave.SUCCESS]: fetchSuccess,
  [roomLeave.TRIGGER]: changeParam('room', 'payload'),
});
