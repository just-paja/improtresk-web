import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import Schedule from '../Schedule';

const mockStore = configureMockStore();

describe('Schedule container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: [],
      },
      accomodation: {
        list: {
          data: [
            {
              id: 5,
              name: 'Something new',
            },
          ],
          valid: true,
        },
      },
      years: {
        capacity: {
          data: [],
          valid: true,
        },
        list: {
          data: [
            {
              id: 150,
              current: true,
              topic: 'foo',
              startDate: '2017-01-01',
              endDate: '2018-01-01',
            },
          ],
          valid: true,
        },
      },
      performers: {
        list: {
          data: [],
          valid: true,
        },
      },
      schedule: {
        events: {
          data: [],
          valid: true,
        },
      },
      texts: {
        list: {
          'schedule-intro': {
            data: {
              text: 'foo',
            },
            valid: true,
          },
        },
      },
      workshops: {
        list: {
          data: [],
          valid: true,
        },
        lectors: {
          roles: {
            data: [],
            valid: true,
          },
          list: {
            data: [],
            valid: true,
          },
        },
      },
    });
    comp = shallow(<Schedule />, {
      context: { store },
    });
  });

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(Schedule))')).toHaveProp('progress', {
      failed: false,
      loading: false,
      missing: false,
      required: false,
      valid: true,
      errors: [],
    });
  });

  it('triggers home mounted action on mount', () => {
    comp.dive().dive();
    expect(store.getActions()).toEqual([
      { type: 'PAGE_SCHEDULE_ENTERED' },
    ]);
  });
});
