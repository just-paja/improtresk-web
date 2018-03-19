import React from 'react';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';

import WorkshopList from '../WorkshopList';

const mockStore = configureStore();

describe('WorkshopList container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: ['cs'],
      },
      workshops: {
        difficulties: {
          data: [],
        },
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
        list: {
          valid: true,
          data: [
            {
              id: 20,
              createdAt: '2017-03-05T00:00:00',
              name: 'lunch',
              lectors: [],
              lang: 'cs',
            },
          ],
        },
      },
      years: {
        capacity: {
          data: [],
        },
        list: {
          data: [],
        },
      },
    });
    comp = shallow(<WorkshopList to="foo" />, {
      context: { store },
    });
  });

  it('provides list of workshops', () => {
    expect(comp.dive().dive().find('WorkshopList')).toHaveProp('workshops', [
      {
        capacityStatus: {},
        createdAt: '2017-03-05T00:00:00',
        difficulty: null,
        id: 20,
        lang: 'cs',
        lectors: [],
        name: 'lunch',
        prices: [],
      },
    ]);
  });

  it('dispatches workshops required action on mount', () => {
    comp.dive();
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: 'WORKSHOPS_INTERACTIVE_REQUIRED',
    }));
  });

  it('dispatches workshops left action on unmount', () => {
    comp.dive().unmount();
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: 'WORKSHOPS_LEFT',
    }));
  });
});
