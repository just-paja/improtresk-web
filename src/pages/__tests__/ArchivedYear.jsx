import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import ArchivedYear from '../ArchivedYear';

const mockStore = configureMockStore();

describe('ArchivedYear container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({});
    comp = shallow(<ArchivedYear match={{ params: { slug: '2017' } }} />, {
      context: { store },
    });
  });

  it('provides route match', () => {
    expect(comp.find('ArchivedYear')).toHaveProp('match', {
      params: {
        slug: '2017',
      },
    });
  });
});
