import * as constants from '../constants'
import * as api from '../../api'

import { createRoutine } from '../../routines'

export const performerListFetch = createRoutine(
  constants.PERFORMER_LIST_FETCH,
  api.fetchPerformers
)

export const performerDetailFetch = createRoutine(
  constants.PERFORMER_DETAIL_FETCH,
  api.fetchPerformerDetail
)
