import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import Locations from '../Locations';

const mockStore = configureMockStore();

describe('Locations container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: [],
      },
    });
    comp = shallow(<Locations />, {
      context: { store },
    });
  });

  it('provides translate method', () => {
    expect(comp.find('Locations')).toHaveProp('translate');
  });
});
