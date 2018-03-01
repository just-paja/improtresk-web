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
      news: {
        list: {
          data: [
            {
              id: 5,
              name: 'Something new',
            },
          ],
          valid: true,
        },
        detail: {
          data: {
            id: 5,
            name: 'Something new',
            poll: {
              answers: [],
            },
          },
          valid: true,
        },
      },
      years: {
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
      texts: {
        list: {
          'about-festival-short': {
            valid: true,
          },
        },
      },
    });
    comp = shallow(<NewsDetail match={{ params: { slug: 'news-detail-45' } }} />, {
      context: { store },
    });
  });

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(NewsDetail))')).toHaveProp('progress', {
      failed: false,
      loading: false,
      missing: false,
      required: false,
      valid: true,
      errors: [],
    });
  });

  it('provides news list', () => {
    expect(comp.dive().dive().find('NewsDetail')).toHaveProp('news', [
      {
        id: 5,
        name: 'Something new',
      },
    ]);
  });

  it('triggers news detail entered action', () => {
    comp.dive();
    expect(store.getActions()).toEqual([
      { type: 'PAGE_NEWS_DETAIL_ENTERED', slug: 'news-detail-45' },
    ]);
  });
});
