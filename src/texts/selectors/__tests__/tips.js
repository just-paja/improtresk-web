import * as selectors from '..'

describe('Tips selectors', () => {
  it('getTipList returns all stored tips', () => {
    expect(selectors.getTipList({
      texts: {
        tips: {
          data: [
            { id: 1 }
          ]
        }
      }
    })).toEqual([
      { id: 1 }
    ])
  })

  it('isTipListRequired returns true when in invalid state', () => {
    expect(selectors.isTipListRequired({
      texts: {
        tips: {
          valid: false
        }
      }
    })).toBe(true)
  })

  it('isTipListRequired returns false when in valid state', () => {
    expect(selectors.isTipListRequired({
      texts: {
        tips: {
          valid: true
        }
      }
    })).toBe(false)
  })
})
