import moment from 'moment'

import { createSelector } from 'reselect'

import { yearCurrent } from '../../years/selectors'

const getSessionData = state => state.session

export const getSignupsCloseDate =
  createSelector(
    yearCurrent,
    year => (year && year.startDate ? year.startDate : null)
  )

export const getSignupsOpenDate =
  createSelector(
    yearCurrent,
    year => (year && year.startSignupsAt ? year.startSignupsAt : null)
  )

export const getForceOpen =
  createSelector(
    state => state.years.list,
    years => years.forceOpen
  )

export const areSignupsClosed = createSelector(
  [getSignupsCloseDate],
  (end) => {
    const now = moment()
    if (!end) {
      return false
    }

    return now.isAfter(end)
  }
)

export const areSignupsOpen = createSelector(
  [getSignupsOpenDate, getForceOpen, areSignupsClosed, getSessionData],
  (start, forceOpen, alreadyClosed, session) => {
    if (session.forceOpenSignups) {
      return true
    }

    const now = moment()
    if (!start) {
      return false
    }

    return (now.isAfter(start) || forceOpen) && !alreadyClosed
  }
)
