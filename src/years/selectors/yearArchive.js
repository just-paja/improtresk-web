import { createSelector } from 'reselect'
import { getData, getProgress, isRequired } from 'react-saga-rest'

export const getArchiveState = state => state.years.archive
export const getCurrentYearState = state => state.current
export const getArchiveData = getData(getArchiveState)

export const getCurrent = createSelector(getArchiveState, state => state.current)

export const getArchivedYear = createSelector(
  getArchiveData,
  current => (current ? current.year : null)
)

export const getArchivedYearTopic = createSelector(
  getArchiveData,
  current => (current ? current.topic : null)
)

export const getArchivedYearWorkshops = createSelector(
  getArchiveData,
  current => (current ? current.workshops || [] : [])
)

export const isArchiveRequired = isRequired(getArchiveState)
export const getArchiveProgress = getProgress(getArchiveState)
