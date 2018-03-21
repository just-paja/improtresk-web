import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import { orderListFetch } from '../../actions';

import OrderList from '../OrderList';

const mockStore = configureMockStore();

describe('OrderList container', () => {
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
      food: {
        list: {
          data: [],
        },
      },
      orders: {
        list: {
          data: [
            {
              createdAt: '2017-04-09',
              endsAt: '2017-05-09',
              symvar: '34598289',
              id: 432,
              reservation: {
                accomodation: 5,
              },
              year: 150,
              price: 434,
            },
          ],
          valid: true,
        },
      },
      participants: {
        detail: {},
      },
      workshops: {
        lectors: {
          list: {
            data: [],
          },
          roles: {
            data: [],
          },
        },
        list: {
          data: [],
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
            },
          ],
          valid: true,
        },
      },
    });
    comp = shallow(<OrderList />, {
      context: { store },
    });
  });

  it('provides progress', () => {
    expect(comp.find('ContainerProgress(Connect(OrderList))')).toHaveProp('progress', {
      failed: false,
      loading: false,
      missing: false,
      required: false,
      valid: true,
      errors: [],
    });
  });

  it('provides order list list', () => {
    expect(comp.dive().dive().find('OrderList')).toHaveProp('orders', [
      {
        assigned: false,
        id: 432,
        createdAt: '2017-04-09',
        endsAt: '2017-05-09',
        symvar: '34598289',
        accomodation: {
          id: 5,
          name: 'Something new',
          capacityStatus: {},
        },
        reservation: {
          accomodation: 5,
        },
        price: 434,
        remainingPrice: 434,
        workshop: null,
        meals: [],
        year: {
          id: 150,
          current: true,
          topic: 'foo',
        },
      },
    ]);
  });

  it('triggers order list required action on mount', () => {
    comp.dive().dive();
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: orderListFetch.TRIGGER,
    }));
  });
});
