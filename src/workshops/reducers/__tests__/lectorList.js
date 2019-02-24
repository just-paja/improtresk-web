import lectorList from '../lectorList'

describe('Lector list reducer', () => {
  it('returns default state', () => {
    expect(lectorList()).toMatchObject({
      loading: false,
      data: []
    })
  })

  it('marks as loading on LECTORS_FETCH_STARTED', () => {
    expect(lectorList({}, { type: 'LECTORS_FETCH_STARTED' })).toMatchObject({
      loading: true
    })
  })

  it('marks as loading on LECTORS_FETCH_SUCCESS', () => {
    expect(lectorList(
      {},
      {
        type: 'LECTORS_FETCH_SUCCESS',
        data: [
          { name: 'foo' }
        ]
      }
    )).toMatchObject({
      loading: false,
      valid: true,
      data: [
        { name: 'foo' }
      ]
    })
  })

  it('marks as loading on LECTORS_FETCH_ERROR', () => {
    expect(lectorList({}, { type: 'LECTORS_FETCH_ERROR', error: 'error' })).toMatchObject({
      loading: false,
      error: 'error'
    })
  })
})
