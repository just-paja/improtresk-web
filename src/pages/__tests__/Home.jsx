import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import Home from '../Home';

const mockStore = configureMockStore();

describe('Home container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
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
    comp = shallow(<Home />, {
      context: { store },
    });
  });

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(Home))')).toHaveProp('progress', {
      failed: false,
      loading: false,
      missing: false,
      required: false,
      valid: true,
      errors: [],
    });
  });

  it('provides active year', () => {
    expect(comp.dive().dive().find('Home')).toHaveProp('year', {
      id: 150,
      current: true,
      topic: 'foo',
    });
  });

  it('provides news list', () => {
    expect(comp.dive().dive().find('Home')).toHaveProp('news', [
      {
        id: 5,
        name: 'Something new',
      },
    ]);
  });

  it('triggers home entered action', () => {
    comp.dive();
    expect(store.getActions()).toEqual([
      { type: 'PAGE_HOME_ENTERED' },
    ]);
  });
});
