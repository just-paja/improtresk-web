import { expect } from 'chai';

import {
  getScheduleEvents,
  isValid,
} from '../../../src/web/selectors/schedule';

describe('Schedule selectors', () => {
  it('isValid returns true when valid', () => {
    expect(isValid({
      schedule: {
        valid: true,
      },
    })).to.equal(true);
  });
  it('isValid returns false when invalid', () => {
    expect(isValid({
      schedule: {
        valid: false,
      },
    })).to.equal(false);
  });

  it('getScheduleEvents returns sorted aggregated event data', () => {
    expect(getScheduleEvents({
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      capacity: {
        data: [],
      },
      performers: {
        list: {
          data: [],
        },
      },
      schedule: {
        data: [
          {
            id: 3,
            startAt: '2016-03-03T13:30:30',
            workshops: [],
          },
          {
            id: 1,
            startAt: '2016-01-01T11:10:10',
            workshops: [],
          },
          {
            id: 2,
            startAt: '2016-02-02T22:20:20',
            workshops: [],
          },
          {
            id: 22,
            startAt: '2016-02-02T22:20:20',
            workshops: [],
          },
        ],
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [],
        },
      },
      years: {
        data: [],
      },
    })).to.eql([
      {
        id: 1,
        startAt: '2016-01-01T11:10:10',
        performer: null,
        workshops: [],
      },
      {
        id: 2,
        startAt: '2016-02-02T22:20:20',
        performer: null,
        workshops: [],
      },
      {
        id: 22,
        startAt: '2016-02-02T22:20:20',
        performer: null,
        workshops: [],
      },
      {
        id: 3,
        startAt: '2016-03-03T13:30:30',
        performer: null,
        workshops: [],
      },
    ]);
  });
});
