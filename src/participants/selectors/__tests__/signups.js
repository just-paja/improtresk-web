import sinon from 'sinon'

import {
  areSignupsOpen,
  getSignupsCloseDate,
  getSignupsOpenDate
} from '../signups'

describe('Signup selectors', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers(new Date(2016, 0, 2, 3, 4, 5))
  })

  afterEach(() => {
    clock.restore()
  })

  it('getSignupsOpenDate returns null when there is no current year', () => {
    expect(getSignupsOpenDate({
      years: {
        list: {
          data: []
        }
      }
    })).toBe(null)
  })

  it('getSignupsOpenDate returns null when year has no signup date', () => {
    expect(getSignupsOpenDate({
      years: {
        list: {
          data: [
            {
              id: 1,
              current: true
            }
          ]
        }
      }
    })).toBe(null)
  })

  it('getSignupsOpenDate returns date when year has signup date', () => {
    expect(getSignupsOpenDate({
      years: {
        list: {
          data: [
            {
              id: 1,
              current: true,
              startSignupsAt: '2016-01-02T03:04:05'
            }
          ]
        }
      }
    })).toBe('2016-01-02T03:04:05')
  })

  it('getSignupsCloseDate returns null when there is no current year', () => {
    expect(getSignupsCloseDate({
      years: {
        list: {
          data: []
        }
      }
    })).toBe(null)
  })

  it('getSignupsCloseDate returns null when year has no signup date', () => {
    expect(getSignupsCloseDate({
      years: {
        list: {
          data: [
            {
              id: 1,
              current: true
            }
          ]
        }
      }
    })).toBe(null)
  })

  it('getSignupsCloseDate returns date when year has signup date', () => {
    expect(getSignupsCloseDate({
      years: {
        list: {
          data: [
            {
              id: 1,
              current: true,
              startDate: '2016-01-02'
            }
          ]
        }
      }
    })).toBe('2016-01-02')
  })

  it('areSignupsOpen returns false when year signup start date is not available', () => {
    expect(areSignupsOpen({
      session: {},
      years: {
        list: {
          data: [
            {
              id: 1,
              current: true,
              startDate: '2016-02-03'
            }
          ],
          forceOpen: false
        }
      }
    })).toBe(false)
  })

  it('areSignupsOpen returns false when year signup start date is after current time', () => {
    expect(areSignupsOpen({
      session: {},
      years: {
        list: {
          data: [
            {
              id: 1,
              current: true,
              startDate: '2016-01-09T03:04:05',
              startSignupsAt: '2016-01-03T03:04:05'
            }
          ],
          forceOpen: false
        }
      }
    })).toBe(false)
  })

  it('areSignupsOpen returns false when year signup end date is not available', () => {
    expect(areSignupsOpen({
      session: {},
      years: {
        list: {
          data: [
            {
              id: 1,
              current: true
            }
          ]
        }
      }
    })).toBe(false)
  })

  it('areSignupsOpen returns false when year signup end date is before current time', () => {
    expect(areSignupsOpen({
      session: {},
      years: {
        list: {
          data: [
            {
              id: 1,
              current: true,
              startDate: '2015-01-09T03:04:05',
              startSignupsAt: '2015-01-03T03:04:05'
            }
          ],
          forceOpen: false
        }
      }
    })).toBe(false)
  })

  it('areSignupsOpen returns true when forced', () => {
    expect(areSignupsOpen({
      session: {
        forceOpenSignups: true
      },
      years: {
        list: {
          data: [
            {
              id: 1,
              current: true,
              startDate: '2016-02-01',
              startSignupsAt: '2016-01-01T03:04:05'
            }
          ]
        }
      }
    })).toBe(true)
  })

  it('areSignupsOpen returns true when year signup start date is before and end date after current time', () => {
    expect(areSignupsOpen({
      session: {},
      years: {
        list: {
          data: [
            {
              id: 1,
              current: true,
              startDate: '2016-02-01',
              startSignupsAt: '2016-01-01T03:04:05'
            }
          ],
          forceOpen: false
        }
      }
    })).toBe(true)
  })
})
