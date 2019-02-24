import { combine, fetchStart, fetchError, fetchSuccess } from 'react-saga-rest'

import * as constants from '../constants'

const defaultState = {
  data: [],
  loading: false
}

export default combine(defaultState, {
  [constants.LOCATIONS_FETCH_STARTED]: fetchStart,
  [constants.LOCATIONS_FETCH_SUCCESS]: fetchSuccess,
  [constants.LOCATIONS_FETCH_ERROR]: fetchError
})
