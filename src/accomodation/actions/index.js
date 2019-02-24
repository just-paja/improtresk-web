import * as constants from '../constants'
import * as api from '../../api'

import { createCapRoutine } from '../../routines'

export const accomodationListFetch = createCapRoutine(
  constants.ACCOMODATION_LIST_FETCH,
  api.fetchAccomodation
)

export default { accomodationListFetch }
