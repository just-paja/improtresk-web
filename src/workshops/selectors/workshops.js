import {
  getData,
  getProgress,
  getProp,
  isRequired,
  transformData
} from 'react-saga-rest'

import { getLectorRolesState, getLectorListState } from './lectors'
import {
  aggregateCapacityData,
  getWorkshopCapacity,
  getPriceLevels,
  getCapacityState
} from '../../years/selectors'

export const getDifficultiesState = state => state.workshops.difficulties
export const getWorkshopDetailState = state => state.workshops.detail
export const getWorkshopListState = state => state.workshops.list

export const getWorkshopListProgress = getProgress(getWorkshopListState)
export const isWorkshopListRequired = isRequired(getWorkshopListState, getCapacityState)

export const getWorkshopDetailId = getProp(getWorkshopDetailState, 'id')
export const getWorkshopDetailProgress = getProgress(getWorkshopDetailState)
export const isWorkshopDetailRequired = isRequired(getWorkshopDetailState, getCapacityState)

export const getDifficultyList = getData(getDifficultiesState)
export const isDifficultyListRequired = isRequired(getDifficultiesState)

export const findLectorRoleName = (roles, id) => {
  if (roles) {
    const role = roles.find(roleRecord => roleRecord.id === id)
    return role ? role.name : null
  }
  return null
}

export const transformLectorRole = (lectors, roles) => (lectorPosition) => {
  if (lectorPosition && lectors && roles) {
    const lector = lectors.find(lectorItem => lectorPosition.lector === lectorItem.id)
    const role = findLectorRoleName(roles, lectorPosition.role)
    if (lector && role) {
      return {
        id: lectorPosition.id,
        lector,
        role
      }
    }
  }
  return null
}

export const transformLectorRoles = (workshop, lectorsAndRoles) => (workshop ? ({
  ...workshop,
  lectors: workshop.lectors
    .map(transformLectorRole(lectorsAndRoles.lectors, lectorsAndRoles.roles))
    .filter(item => item)
}) : null)

export const transformWorkshopDifficultyName = (workshop, difficulties) => {
  const difficulty = difficulties.find(record => record.id === workshop.difficulty)
  return (workshop ? ({
    ...workshop,
    difficulty: difficulty ? difficulty.name : null
  }) : null)
}

export const aggregateWorkshopPriceLevelData = priceLevels => (priceItem) => {
  const priceLevelId = priceItem.price_level
  if (priceLevels) {
    const priceLevel = priceLevels.find(priceLevelItem => priceLevelItem.id === priceLevelId)
    if (priceLevel) {
      return {
        id: priceItem.id,
        price: priceItem.price,
        level: priceLevel.name,
        takesEffectOn: priceLevel.takesEffectOn,
        endsOn: priceLevel.endsOn
      }
    }
  }
  return null
}

export const transformWorkshopPriceData = (workshop, priceLevels) => (workshop ? ({
  ...workshop,
  prices: workshop.prices && priceLevels
    ? workshop.prices
      .map(aggregateWorkshopPriceLevelData(priceLevels))
      .filter(item => item) : []
}) : null)

const getLectorsAndRoles = getData({
  lectors: getLectorListState,
  roles: getLectorRolesState
})

const workshopTransformations = [
  {
    select: getLectorsAndRoles,
    transform: transformLectorRoles
  },
  {
    select: getDifficultyList,
    transform: transformWorkshopDifficultyName
  },
  {
    select: getPriceLevels,
    transform: transformWorkshopPriceData
  },
  {
    select: getWorkshopCapacity,
    transform: (workshop, capacityData) => (workshop ? ({
      ...workshop,
      capacityStatus: aggregateCapacityData(workshop.id, capacityData) || {}
    }) : null)
  }
]

export const workshopsDetail = transformData(getWorkshopDetailState, workshopTransformations)

export const getWorkshopList = transformData(getWorkshopListState, workshopTransformations)

export const getArchivedYearWorkshops = transformData(
  state => state.years.archive.data.workshops,
  workshopTransformations
)
