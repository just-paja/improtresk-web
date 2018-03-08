import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import Contact from '../Contact';

const mockStore = configureMockStore();

describe('Contact container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: [],
      },
    });
    comp = shallow(<Contact />, {
      context: { store },
    });
  });

  it('provides translate method', () => {
    expect(comp.find('Contact')).toHaveProp('translate');
  });
});
