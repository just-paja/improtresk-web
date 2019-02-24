import * as selectors from '..'

describe('Performer selectors', () => {
  it('isPerformerListRequired returns false when valid', () => {
    expect(selectors.isPerformerListRequired({
      performers: {
        list: {
          valid: true
        }
      }
    })).toBe(false)
  })

  it('isPerformerListRequired returns true when invalid', () => {
    expect(selectors.isPerformerListRequired({
      performers: {
        list: {
          valid: false
        }
      }
    })).toBe(true)
  })

  it('isPerformerDetailRequired returns true when invalid', () => {
    expect(selectors.isPerformerDetailRequired({
      performers: {
        detail: {
          valid: false,
          data: {}
        }
      }
    })).toBe(true)
  })

  it('isPerformerDetailRequired returns false when invalid', () => {
    expect(selectors.isPerformerDetailRequired({
      performers: {
        detail: {
          valid: true,
          data: {}
        }
      }
    })).toBe(false)
  })

  it('getPerformerList returns aggregated performers data', () => {
    expect(selectors.getPerformerList({
      performers: {
        list: {
          data: [
            { id: 5 },
            { id: 6 }
          ]
        }
      }
    })).toEqual([
      { id: 5 },
      { id: 6 }
    ])
  })

  it('getPerformerList returns aggregated performers data without front image', () => {
    expect(selectors.getPerformerList({
      performers: {
        list: {
          data: [
            { id: 5, photos: [] }
          ]
        }
      }
    })).toEqual([
      { id: 5, photos: [], frontImage: null }
    ])
  })

  it('getPerformerDetail returns aggregated performers data', () => {
    expect(selectors.getPerformerDetail({
      performers: {
        detail: {
          data: { id: 5 }
        }
      }
    })).toEqual({ id: 5 })
  })

  it('getPerformerDetailId returnsd detail selected id', () => {
    expect(selectors.getPerformerDetailId({
      performers: {
        detail: {
          id: 7
        }
      }
    })).toBe(7)
  })
})
