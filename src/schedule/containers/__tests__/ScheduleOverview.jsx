import React from 'react'
import configureStore from 'redux-mock-store'

import { shallow } from 'enzyme'

import ScheduleOverview from '../ScheduleOverview'

const mockStore = configureStore()

describe('ScheduleOverview container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: ['cs']
      },
      performers: {
        list: {
          valid: true,
          data: []
        }
      },
      schedule: {
        events: {
          valid: true,
          data: [
            {
              id: 20,
              createdAt: '2017-03-05T00:00:00',
              name: 'lunch',
              text: 'foo',
              lang: 'cs'
            }
          ]
        }
      },
      workshops: {
        lectors: {
          roles: {
            data: []
          },
          list: {
            data: []
          }
        },
        difficulties: {
          data: []
        },
        list: {
          valid: true,
          data: []
        }
      },
      years: {
        capacity: {},
        list: {
          valid: true,
          data: [
            {
              id: 10,
              year: '2018',
              current: true,
              startAt: '2018-05-11',
              endAt: '2018-05-13'
            }
          ]
        }
      }
    })
    comp = shallow(<ScheduleOverview />, {
      context: { store }
    })
  })

  it('provides list of events', () => {
    expect(comp.dive().dive().find('ScheduleOverview')).toHaveProp('events', [
      {
        id: 20,
        createdAt: '2017-03-05T00:00:00',
        name: 'lunch',
        text: 'foo',
        lang: 'cs',
        workshops: [],
        performer: null
      }
    ])
  })

  it('dispatches schedule required action on mount', () => {
    comp.dive()
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: 'SCHEDULE_EVENTS_REQUIRED'
    }))
  })
})
