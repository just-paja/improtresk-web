import locationList from '../locationList'

describe('locationList reducer', () => {
  it('returns default state', () => {
    expect(locationList()).toMatchObject({
      data: [],
      loading: false
    })
  })

  it('marks as loading on LOCATIONS_FETCH_STARTED', () => {
    expect(locationList({}, { type: 'LOCATIONS_FETCH_STARTED' })).toMatchObject({
      loading: true
    })
  })

  it('marks as loading on LOCATIONS_FETCH_SUCCESS', () => {
    expect(locationList(
      {},
      {
        type: 'LOCATIONS_FETCH_SUCCESS',
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

  it('marks as loading on LOCATIONS_FETCH_ERROR', () => {
    expect(locationList({}, { type: 'LOCATIONS_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error'
    })
  })
})
