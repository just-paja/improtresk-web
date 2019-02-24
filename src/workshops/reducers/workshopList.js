import { combine, fetchStart, fetchError, fetchSuccess } from 'react-saga-rest'

import * as constants from '../constants'

const defaultState = {
  data: [],
  loading: false
}

export default combine(defaultState, {
  [constants.WORKSHOPS_FETCH_STARTED]: fetchStart,
  [constants.WORKSHOPS_FETCH_SUCCESS]: fetchSuccess,
  [constants.WORKSHOPS_FETCH_ERROR]: fetchError
})
