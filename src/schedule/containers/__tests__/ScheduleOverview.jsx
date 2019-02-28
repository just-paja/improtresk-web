import React from 'react'

import ScheduleOverview from '../ScheduleOverview'

import { renderContainer } from '../../../../mock/containers'

describe('ScheduleOverview container', () => {
  let comp

  beforeEach(() => {
    const state = {
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
              startDate: '2018-05-11',
              endDate: '2018-05-13'
            }
          ]
        }
      }
    }
    comp = renderContainer(<ScheduleOverview />, state)
  })

  it('provides list of events', () => {
    expect(comp.find('ScheduleOverview')).toHaveProp('events', [
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
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: 'SCHEDULE_EVENTS_REQUIRED'
    }))
  })
})
