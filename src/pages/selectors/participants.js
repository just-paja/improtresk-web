import { getProgress } from 'react-saga-rest'

import { getOrderListState } from '../../orders/selectors'
import { getParticipantDetailState } from '../../participants/selectors'

export const getParticipantHomeProgress = getProgress(
  getOrderListState,
  getParticipantDetailState
)

export default { getParticipantHomeProgress }
