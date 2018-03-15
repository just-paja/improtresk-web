import React from 'react';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';

import WorkshopDetail from '../WorkshopDetail';

const mockStore = configureStore();

describe('WorkshopDetail container', () => {
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
        detail: {
          valid: true,
          data: {
            id: 20,
            createdAt: '2017-03-05T00:00:00',
            name: 'lunch',
            lectors: [],
            lang: 'cs',
          },
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
    comp = shallow(<WorkshopDetail resourceId="nehraj-349" />, {
      context: { store },
    });
  });

  it('provides list of workshops', () => {
    expect(comp.dive().dive().find('WorkshopDetail')).toHaveProp('workshop', {
      capacityStatus: {},
      createdAt: '2017-03-05T00:00:00',
      difficulty: null,
      id: 20,
      lang: 'cs',
      lectors: [],
      name: 'lunch',
      prices: [],
    });
  });

  it('dispatches workshop detail required action on mount', () => {
    comp.dive();
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: 'WORKSHOP_DETAIL_REQUIRED',
      slug: 'nehraj-349',
    }));
  });

  it('dispatches workshop detail left action on unmount', () => {
    comp.dive().unmount();
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: 'WORKSHOP_DETAIL_LEFT',
    }));
  });
});
