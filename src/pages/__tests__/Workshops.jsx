import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import Workshops from '../Workshops';

const mockStore = configureMockStore();

describe('Workshops container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: [],
      },
    });
    comp = shallow(<Workshops />, {
      context: { store },
    });
  });

  it('provides translate method', () => {
    expect(comp.find('Workshops')).toHaveProp('translate');
  });
});
