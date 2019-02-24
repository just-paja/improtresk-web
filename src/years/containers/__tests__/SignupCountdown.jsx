import configureMockStore from 'redux-mock-store'
import React from 'react'

import { shallow } from 'enzyme'

import SignupCountdown from '../SignupCountdown'

const mockStore = configureMockStore()

describe('SignupCountdown container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: []
      },
      years: {
        capacity: {
          data: [],
          valid: true
        },
        list: {
          data: [
            {
              id: 150,
              current: true,
              topic: 'foo',
              startSignupsAt: '2017-05-09T00:00:00',
              startDate: '2017-05-11T00:00:00'
            }
          ],
          valid: true
        }
      },
      texts: {
        list: {
          'accomodation-intro': {
            data: {
              text: 'foo'
            },
            valid: true
          }
        }
      }
    })
    comp = shallow(<SignupCountdown onOpen={() => {}} />, {
      context: { store }
    })
  })

  it('provides openDate as years signup open date', () => {
    expect(comp.find('SignupCountdown')).toHaveProp('openDate', '2017-05-09T00:00:00')
  })

  it('provides closeDate as years start date', () => {
    expect(comp.find('SignupCountdown')).toHaveProp('closeDate', '2017-05-11T00:00:00')
  })
})
