import { createSelector } from 'reselect'
import { getData, getProgress, getProp, isRequired } from 'react-saga-rest'

export const getParticipantDetailState = state => state.participants.detail

export const getParticipantDetail = getData(getParticipantDetailState)
export const getParticipantId = getProp(getParticipantDetail, 'id')
export const getParticipantProgress = getProgress(getParticipantDetailState)
export const isParticipantRequired = isRequired(getParticipantDetailState)

export const getParticipantEditValues = createSelector(
  [getParticipantDetail],
  participant => ({
    email: participant.email,
    name: participant.name,
    phone: participant.phone,
    team_name: participant.team
  })
)

export const getParticipantIdentityValues = createSelector(
  [getParticipantDetail],
  participant => ({
    address: participant.address,
    idNumber: participant.idNumber
  })
)
