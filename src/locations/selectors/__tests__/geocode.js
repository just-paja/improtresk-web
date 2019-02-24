import {
  getAllAddresses,
  isReady
} from '..'

describe('Geocode selectors', () => {
  it('getAllAddresses returns all available addresses', () => {
    expect(getAllAddresses({
      locations: {
        geocode: {
          foo: {},
          bar: null
        }
      }
    })).toEqual(['foo', 'bar'])
  })
  it('isReady returns true when all addresses are ready', () => {
    expect(isReady({
      locations: {
        geocode: {
          foo: {
            ready: true
          },
          bar: {
            ready: true
          }
        }
      }
    })).toBe(true)
  })
  it('isReady returns false when not all addresses are ready', () => {
    expect(isReady({
      locations: {
        geocode: {
          foo: {
            ready: true
          },
          zap: null,
          bar: {
            ready: false
          }
        }
      }
    })).toBe(false)
  })
})
