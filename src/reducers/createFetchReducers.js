import {
  fetchFailure,
  fetchStart,
  fetchStop,
  fetchSuccess,
  invalidateOnResourceChange
} from 'react-saga-rest'

export { defaultResourceState as initialState } from 'react-saga-rest'

export default ({
  routine,
  identAttr
}) => ({
  [routine.TRIGGER]: identAttr ? invalidateOnResourceChange(identAttr, 'payload') : undefined,
  [routine.FAILURE]: fetchFailure,
  [routine.FULFILL]: fetchStop,
  [routine.REQUEST]: fetchStart,
  [routine.SUCCESS]: fetchSuccess
})
