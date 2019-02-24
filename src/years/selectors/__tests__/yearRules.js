import * as selectors from '../yearRules'

describe('YearRules selectors', () => {
  it('currentRules returns all news stored', () => {
    expect(selectors.getRules({
      years: {
        rules: {
          data: {
            id: 1,
            text: 'foo'
          }
        }
      }
    })).toEqual({
      id: 1,
      text: 'foo'
    })
  })

  it('isRulesTextRequired returns true when in invalid state', () => {
    expect(selectors.isRulesTextRequired({
      years: {
        rules: {
          loading: false,
          valid: false
        }
      }
    })).toBe(true)
  })

  it('isRulesTextRequired returns false when in valid state', () => {
    expect(selectors.isRulesTextRequired({
      years: {
        rules: {
          loading: false,
          valid: true
        }
      }
    })).toBe(false)
  })
})
