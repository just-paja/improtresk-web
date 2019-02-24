import { combine, fetchSuccess } from 'react-saga-rest'
import { roomJoin, roomLeave, roomListFetch } from '../actions'

import createCollectionReducers, { initialState } from '../../reducers/createCollectionReducers'

export default combine(initialState, {
  ...createCollectionReducers({
    routine: roomListFetch,
    identAttr: 'id'
  }),
  [roomJoin.SUCCESS]: fetchSuccess,
  [roomLeave.SUCCESS]: fetchSuccess
})
