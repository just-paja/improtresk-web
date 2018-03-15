import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import NewsDetail from '../NewsDetail';

const mockStore = configureMockStore();

describe('NewsDetail container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      forms: {},
    });
    comp = shallow(<NewsDetail match={{ params: { slug: 'news-detail-45' } }} />, {
      context: { store },
    });
  });

  it('provides route match', () => {
    expect(comp.find('NewsDetail')).toHaveProp('match', {
      params: {
        slug: 'news-detail-45',
      },
    });
  });
});
