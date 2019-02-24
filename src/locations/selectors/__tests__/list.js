import * as selectors from '..'

describe('Location selectors', () => {
  it('getLocationsState returns Locations state', () => {
    expect(selectors.getLocationsState({
      locations: {
        list: {
          loading: false,
          valid: false
        }
      }
    })).toEqual({
      loading: false,
      valid: false
    })
  })

  it('getAddresses returns list of all workshop location addresses', () => {
    expect(selectors.getAddresses({
      locations: {
        list: {
          data: [
            {
              id: 1,
              address: 'Nádražní 14'
            },
            {
              id: 2,
              address: 'Pražská 1'
            }
          ]
        }
      }
    })).toEqual([
      'Nádražní 14',
      'Pražská 1'
    ])
  })

  it('getLocationList returns list of all locations', () => {
    expect(selectors.getLocationList({
      locations: {
        list: {
          data: [
            {
              id: 1,
              address: 'Nádražní 14'
            }
          ]
        }
      }
    })).toEqual([
      {
        id: 1,
        address: 'Nádražní 14'
      }
    ])
  })

  it('getLocationMarkers returns list of all geocoded locations', () => {
    expect(selectors.getLocationMarkers({
      locations: {
        geocode: {
          'Nádražní 1': {
            valid: true,
            data: { lat: 'foo', lng: 'bar' }
          },
          'Hradecká 42': {
            valid: false
          }
        },
        list: {
          data: [
            {
              id: 1,
              address: 'Nádražní 1'
            },
            {
              id: 2,
              address: 'Pražská 9'
            },
            {
              id: 3,
              address: 'Hradecká 42'
            }
          ]
        }
      }
    })).toEqual([
      {
        id: 1,
        address: 'Nádražní 1',
        lat: 'foo',
        lng: 'bar'
      }
    ])
  })
})
