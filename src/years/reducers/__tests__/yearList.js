import yearList from '../yearList'

describe('Years reducer', () => {
  it('returns default state', () => {
    expect(yearList()).toMatchObject({
      loading: false,
      data: [],
      forceOpen: false
    })
  })

  it('force opens signups on SIGNUPS_OPEN', () => {
    expect(yearList({}, { type: 'SIGNUPS_OPEN' })).toMatchObject({
      forceOpen: true
    })
  })

  it('marks as loading on YEARS_FETCH_STARTED', () => {
    expect(yearList({}, { type: 'YEARS_FETCH_STARTED' })).toMatchObject({
      loading: true
    })
  })

  it('marks as loading on YEARS_FETCH_SUCCESS', () => {
    expect(yearList(
      {},
      {
        type: 'YEARS_FETCH_SUCCESS',
        data: [
          { year: '2016' },
          { year: '2017' }
        ]
      }
    )).toMatchObject({
      loading: false,
      valid: true,
      data: [
        { year: '2016' },
        { year: '2017' }
      ]
    })
  })

  it('marks as loading on YEARS_FETCH_ERROR', () => {
    expect(yearList({}, { type: 'YEARS_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error'
    })
  })
})
