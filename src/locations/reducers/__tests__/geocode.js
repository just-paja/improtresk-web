import geocode from '../geocode'

describe('Geocode reducer', () => {
  it('updates locations list', () => {
    expect(geocode(
      {},
      {
        type: 'GEOCODE_LOCATIONS_RESET',
        data: [
          { address: 'foo' },
          { address: 'bar' }
        ]
      }
    )).toMatchObject({
      bar: { data: null },
      foo: { data: null }
    })
  })

  it('returns default state', () => {
    expect(geocode()).toMatchObject({})
  })

  it('returns state marked as loading', () => {
    expect(geocode(
      {},
      { type: 'GEOCODE_LOCATION_FETCH_STARTED', address: 'foo' }
    )).toMatchObject({
      foo: {
        loading: true
      }
    })
  })

  it('saves address location', () => {
    expect(geocode(
      {},
      {
        type: 'GEOCODE_LOCATION_FETCH_SUCCESS',
        address: 'foo',
        data: {
          results: [
            {
              geometry: {
                location: {
                  lat: 5.234,
                  lng: 2.234
                }
              }
            }
          ]
        }
      }
    )).toMatchObject({
      foo: {
        loading: false,
        valid: true,
        data: {
          lat: 5.234,
          lng: 2.234
        }
      }
    })
  })

  it('saves null for address when results are empty', () => {
    expect(geocode(
      {},
      {
        type: 'GEOCODE_LOCATION_FETCH_SUCCESS',
        address: 'foo',
        data: { results: [] }
      }
    )).toMatchObject({
      foo: {
        loading: false,
        valid: true,
        data: null
      }
    })
  })

  it('saves null for address when results are missing', () => {
    expect(geocode(
      {},
      {
        type: 'GEOCODE_LOCATION_FETCH_SUCCESS',
        address: 'foo',
        data: {}
      }
    )).toMatchObject({
      foo: {
        loading: false,
        valid: true,
        data: null
      }
    })
  })

  it('saves null for address when data are missing', () => {
    expect(geocode(
      {},
      {
        type: 'GEOCODE_LOCATION_FETCH_SUCCESS',
        address: 'foo'
      }
    )).toMatchObject({
      foo: {
        loading: false,
        valid: true,
        data: null
      }
    })
  })

  it('saves geocode error', () => {
    expect(geocode(
      {},
      {
        type: 'GEOCODE_LOCATION_FETCH_ERROR',
        address: 'foo',
        error: 'bar'
      }
    )).toMatchObject({
      foo: {
        error: 'bar',
        loading: false
      }
    })
  })
})
