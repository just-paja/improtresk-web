import React from 'react';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';

import RegistrationStatus from '../RegistrationStatus';

const mockStore = configureStore();

describe('RegistrationStatus container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: ['cs'],
      },
      accomodation: {
        list: {
          data: [],
        },
      },
      food: {
        list: {
          valid: true,
          data: [
            {
              id: 20,
              date: '2017-03-05',
              name: 'lunch',
            },
          ],
        },
      },
      orders: {
        list: {
          data: [
            {
              id: 10,
              year: 10,
              reservation: {},
              price: 200,
              symvar: '22323',
              createdAt: '2018-03-14T00:00:00',
            },
          ],
          valid: true,
        },
      },
      participants: {
        detail: {},
      },
      workshops: {
        list: {},
        detail: {},
        difficulties: {
          data: [],
        },
        lectors: {
          roles: {},
          list: {},
        },
      },
      years: {
        capacity: {
          data: {},
        },
        list: {
          data: [
            {
              id: 10,
              current: true,
              year: '2018',
              startDate: '2018-05-05',
            },
          ],
          valid: true,
        },
      },
    });
    comp = shallow(<RegistrationStatus />, {
      context: { store },
    });
  });

  it('provides active order', () => {
    expect(comp.dive().dive().find('RegistrationStatus')).toHaveProp('activeOrder', {
      id: 10,
      assigned: false,
      reservation: {},
      price: 200,
      remainingPrice: 200,
      symvar: '22323',
      createdAt: '2018-03-14T00:00:00',
      accomodation: null,
      meals: [],
      workshop: null,
      year: {
        id: 10,
        current: true,
        year: '2018',
        startDate: '2018-05-05',
      },
    });
  });

  it('dispatches meals required action on mount', () => {
    comp.dive();
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: 'ORDERS_REQUIRED',
    }));
  });
});
