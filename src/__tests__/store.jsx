import * as storeDefinition from '../store'

describe('Store', () => {
  it('configures the initial state', () => {
    expect(storeDefinition.default().getState().device).toEqual({
      isMobile: false
    })
  })

  it('configures the initial state as specified', () => {
    expect(storeDefinition.default({
      device: { isMobile: true }
    }).getState().device).toEqual({
      isMobile: true
    })
  })
})
