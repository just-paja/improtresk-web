import textList from '../textList'

describe('Text List reducer', () => {
  it('returns default state', () => {
    expect(textList()).toMatchObject({})
  })
  it('marks as loading on TEXT_FETCH_STARTED', () => {
    expect(textList({}, {
      category: 'ACCOMODATION_INTRO',
      type: 'TEXT_FETCH_STARTED'
    })).toMatchObject({
      ACCOMODATION_INTRO: {
        data: {},
        loading: true
      }
    })
  })
  it('marks as loading on TEXT_FETCH_SUCCESS', () => {
    expect(textList(
      {},
      {
        type: 'TEXT_FETCH_SUCCESS',
        category: 'ACCOMODATION_INTRO',
        data: {
          text: 'foo'
        }
      }
    )).toMatchObject({
      ACCOMODATION_INTRO: {
        loading: false,
        valid: true,
        data: {
          text: 'foo'
        }
      }
    })
  })
  it('marks as loading on TEXT_FETCH_ERROR', () => {
    expect(textList(
      {},
      {
        type: 'TEXT_FETCH_ERROR',
        category: 'ACCOMODATION_INTRO',
        error: 'error'
      }
    )).toMatchObject({
      ACCOMODATION_INTRO: {
        data: {},
        loading: false,
        error: 'error'
      }
    })
  })
})
