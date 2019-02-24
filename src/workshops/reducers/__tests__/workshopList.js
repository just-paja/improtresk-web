import workshopList from '../workshopList'

describe('Workshops list reducer', () => {
  it('returns default state', () => {
    expect(workshopList()).toMatchObject({
      loading: false,
      data: []
    })
  })

  it('marks as loading on WORKSHOPS_FETCH_STARTED', () => {
    expect(workshopList({}, { type: 'WORKSHOPS_FETCH_STARTED' })).toMatchObject({
      loading: true
    })
  })

  it('marks as loading on WORKSHOPS_FETCH_SUCCESS', () => {
    expect(workshopList(
      {},
      {
        type: 'WORKSHOPS_FETCH_SUCCESS',
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

  it('marks as loading on WORKSHOPS_FETCH_ERROR', () => {
    expect(workshopList({}, { type: 'WORKSHOPS_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error'
    })
  })
})
