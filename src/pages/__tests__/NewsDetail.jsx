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

  it('triggers news detail entered action', () => {
    comp.dive();
    expect(store.getActions()).toEqual([
      { type: 'PAGE_NEWS_DETAIL_ENTERED', slug: 'news-detail-45' },
    ]);
  });
});
