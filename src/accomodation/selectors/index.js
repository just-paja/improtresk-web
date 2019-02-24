import { createSelector } from 'reselect'
import { getProgress, isRequired, transformData } from 'react-saga-rest'

import { aggregateCapacityData, getCapacityState } from '../../years/selectors'

const aggregateAccomodationData = (accomodation, capacity) => ({
  ...accomodation,
  capacityStatus: aggregateCapacityData(accomodation.id, capacity) || {}
})

const getAccomodationCapacity = createSelector(
  getCapacityState,
  capacity => (capacity.data && capacity.data.accomodation ? capacity.data.accomodation : [])
)

export const getAccomodationListState = state => state.accomodation.list

export const getAccomodationListProgress = getProgress(getAccomodationListState)
export const isAccomodationListRequired = isRequired(getAccomodationListState)

export const getAccomodationList = transformData(getAccomodationListState, [
  {
    select: getAccomodationCapacity,
    transform: aggregateAccomodationData
  }
])

export const getCheapestAccomodation = createSelector(
  getAccomodationList,
  accomodation => accomodation.reduce((best, current) => {
    if (!best || current.price < best.price) {
      return current
    }
    return best
  }, null)
)
