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
    });
    comp = shallow(<Schedule />, {
      context: { store },
    });
  });

  it('provides translate method', () => {
    expect(comp.find('Schedule')).toHaveProp('translate');
  });
});
