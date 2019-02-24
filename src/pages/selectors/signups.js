import { getProgress } from 'react-saga-rest'

import { getYearListState } from '../../years/selectors'

export const getSignupPageProgress = getProgress(
  getYearListState
)

export default { getSignupPageProgress }
