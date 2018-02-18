import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import Contact from '../Contact';

const mockStore = configureMockStore();

describe('Contact container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({});
    comp = shallow(<Contact />, {
      context: { store },
    });
  });

  it('triggers page contact entered action on mount', () => {
    comp.dive();
    expect(store.getActions()).toEqual([
      {
        type: 'PAGE_CONTACT_ENTERED',
      },
    ]);
  });
});
