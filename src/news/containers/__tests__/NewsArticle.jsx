import React from 'react';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';
import { newsDetailFetch } from '../../actions';

import NewsArticle from '../NewsArticle';

const mockStore = configureStore();

describe('NewsArticle container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: ['cs'],
      },
      news: {
        detail: {
          valid: true,
          data: {
            id: 20,
            createdAt: '2017-03-05T00:00:00',
            name: 'lunch',
            text: 'foo',
            lang: 'cs',
          },
        },
      },
    });
    comp = shallow(<NewsArticle resourceId="news-10" />, {
      context: { store },
    });
  });

  it('provides news item', () => {
    expect(comp.dive().dive().find('NewsArticle')).toHaveProp('newsDetail', {
      id: 20,
      createdAt: '2017-03-05T00:00:00',
      name: 'lunch',
      text: 'foo',
      lang: 'cs',
    });
  });

  it('dispatches news detail required action on mount', () => {
    comp.dive();
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: newsDetailFetch.TRIGGER,
      payload: 'news-10',
    }));
  });
});
