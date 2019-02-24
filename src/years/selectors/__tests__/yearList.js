import sinon from 'sinon'

import {
  isYearListRequired,
  yearActive,
  yearActiveNumber,
  yearCurrent,
  yearNext,
  yearsNotCurrent,
  yearsAll
} from '..'

describe('Years selectors', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers(new Date(2016, 0, 2, 3, 4, 5))
  })

  afterEach(() => {
    clock.restore()
  })

  it('yearsAll returns all news stored', () => {
    expect(yearsAll({
      years: {
        list: {
          data: [
            { id: 1 },
            { id: 2 }
          ]
        }
      }
    })).toEqual([
      { id: 1 },
      { id: 2 }
    ])
  })

  it('yearCurrent returns current year object when available', () => {
    expect(yearCurrent({
      years: {
        list: {
          data: [
            { id: 1 },
            { id: 2, current: true }
          ]
        }
      }
    })).toEqual({
      id: 2,
      current: true
    })
  })

  it('yearCurrent returns null when not available', () => {
    expect(yearCurrent({
      years: {
        list: {
          data: [
            { id: 1 },
            { id: 2 }
          ]
        }
      }
    })).toBe(null)
  })

  it('isYearListRequired returns false when years are valid', () => {
    expect(isYearListRequired({
      years: {
        list: {
          valid: true
        }
      }
    })).toBe(false)
  })

  it('isYearListRequired returns true when years are not valid', () => {
    expect(isYearListRequired({
      years: {
        list: {
          valid: false
        }
      }
    })).toBe(true)
  })

  it('yearNext returns next closest year when available', () => {
    expect(yearNext({
      years: {
        list: {
          data: [
            { id: 1, startDate: '2015-02-03' },
            { id: 3, startDate: '2017-02-03' },
            { id: 2, startDate: '2016-02-03' }
          ]
        }
      }
    })).toEqual({ id: 2, startDate: '2016-02-03' })
  })

  it('yearNext returns last year when there is no future year', () => {
    expect(yearNext({
      years: {
        list: {
          data: [
            { id: 1, startDate: '2014-02-03' },
            { id: 2, startDate: '2015-02-03' }
          ]
        }
      }
    })).toEqual({ id: 2, startDate: '2015-02-03' })
  })

  it('yearNext returns null when there no data', () => {
    expect(yearNext({
      years: {
        list: {
          data: []
        }
      }
    })).toBe(null)
  })

  it('yearsNotCurrent returns next closest year when available', () => {
    expect(yearsNotCurrent({
      years: {
        list: {
          data: [
            { id: 1, endDate: '2015-02-03' },
            { id: 3, endDate: '2017-02-03', current: true },
            { id: 2, endDate: '2016-02-03' }
          ]
        }
      }
    })).toEqual([
      { id: 1, endDate: '2015-02-03' }
    ])
  })

  it('yearActive returns current year when available', () => {
    expect(yearActive({
      years: {
        list: {
          data: [
            { id: 1, endDate: '2015-02-03' },
            { id: 3, endDate: '2017-02-03', current: true },
            { id: 2, endDate: '2016-02-03' }
          ]
        }
      }
    })).toEqual({
      id: 3,
      endDate: '2017-02-03',
      current: true
    })
  })

  it('yearActive returns next closest year when current not available', () => {
    expect(yearActive({
      years: {
        list: {
          data: [
            { id: 1, endDate: '2015-02-03' },
            { id: 3, endDate: '2017-02-03' },
            { id: 2, endDate: '2016-02-03' }
          ]
        }
      }
    })).toEqual({
      id: 2,
      endDate: '2016-02-03'
    })
  })

  it('yearActiveNumber  returns current year number when available', () => {
    expect(yearActiveNumber({
      years: {
        list: {
          data: [
            { id: 1, endDate: '2015-02-03' },
            { id: 3, endDate: '2017-02-03', current: true, year: '2017' },
            { id: 2, endDate: '2016-02-03' }
          ]
        }
      }
    })).toBe('2017')
  })

  it('yearActiveNumber eturns null when not available', () => {
    expect(yearActiveNumber({
      years: {
        list: {
          data: []
        }
      }
    })).toBe(null)
  })
})
