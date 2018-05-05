import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import ParticipantHome from '../ParticipantHome';

const mockStore = configureMockStore();

describe('ParticipantHome container', () => {
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
      orders: {
        list: {
          data: [],
        },
      },
      participants: {
        detail: {
          data: null,
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
            },
          ],
          valid: true,
        },
      },
    });
    comp = shallow(<ParticipantHome />, {
      context: { store },
    });
  });

  it('dispatches logout on logout', () => {
    comp.simulate('logout');
    expect(store.getActions()).toEqual([
      { type: 'PARTICIPANT_LOGOUT' },
    ]);
  });
});
