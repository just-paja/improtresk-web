import { combine, fetchStart, fetchError, fetchSuccess } from 'react-saga-rest'

import * as constants from '../constants'

const defaultState = {
  data: [],
  loading: false
}

export default combine(defaultState, {
  [constants.LECTOR_ROLES_FETCH_STARTED]: fetchStart,
  [constants.LECTOR_ROLES_FETCH_SUCCESS]: fetchSuccess,
  [constants.LECTOR_ROLES_FETCH_ERROR]: fetchError
})
