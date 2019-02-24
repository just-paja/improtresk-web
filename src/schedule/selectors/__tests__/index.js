import {
  getScheduleEventList,
  isScheduleEventListRequired
} from '..'

describe('Schedule selectors', () => {
  it('isScheduleEventListRequired returns false when valid', () => {
    expect(isScheduleEventListRequired({
      schedule: {
        events: {
          valid: true
        }
      }
    })).toBe(false)
  })

  it('isScheduleEventListRequired returns true when invalid', () => {
    expect(isScheduleEventListRequired({
      schedule: {
        events: {
          valid: false
        }
      }
    })).toBe(true)
  })

  it.only('getScheduleEventList returns sorted aggregated event data', () => {
    expect(getScheduleEventList({
      performers: {
        list: {
          data: []
        }
      },
      schedule: {
        events: {
          data: [
            {
              id: 3,
              startAt: '2016-03-03T13:30:30',
              workshops: []
            },
            {
              id: 1,
              startAt: '2016-01-01T11:10:10',
              workshops: []
            },
            {
              id: 2,
              startAt: '2016-02-02T22:20:20',
              workshops: []
            },
            {
              id: 22,
              startAt: '2016-02-02T22:20:20',
              workshops: []
            }
          ]
        }
      },
      workshops: {
        difficulties: {
          data: []
        },
        lectors: {
          list: {
            data: []
          },
          roles: {
            data: []
          }
        },
        list: {
          data: []
        }
      },
      years: {
        capacity: {
          data: []
        },
        list: {
          data: []
        }
      }
    })).toEqual([
      {
        id: 1,
        startAt: '2016-01-01T11:10:10',
        performer: null,
        workshops: []
      },
      {
        id: 2,
        startAt: '2016-02-02T22:20:20',
        performer: null,
        workshops: []
      },
      {
        id: 22,
        startAt: '2016-02-02T22:20:20',
        performer: null,
        workshops: []
      },
      {
        id: 3,
        startAt: '2016-03-03T13:30:30',
        performer: null,
        workshops: []
      }
    ])
  })
})
