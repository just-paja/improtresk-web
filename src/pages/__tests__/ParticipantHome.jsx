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

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(ParticipantHome))')).toHaveProp('progress', {
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
      { type: 'PAGE_PARTICIPANT_HOME_ENTERED' },
    ]);
  });
});
