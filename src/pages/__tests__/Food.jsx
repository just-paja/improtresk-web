import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import Food from '../Food';

const mockStore = configureMockStore();

describe('Food container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: [],
      },
      food: {
        list: {
          data: [
            {
              id: 5,
              name: 'Something new',
              date: '2018-05-03',
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
          'food-intro': {
            valid: true,
          },
        },
      },
    });
    comp = shallow(<Food />, {
      context: { store },
    });
  });

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(Food))')).toHaveProp('progress', {
      failed: false,
      loading: false,
      missing: false,
      required: false,
      valid: true,
      errors: [],
    });
  });

  it('provides meal list', () => {
    expect(comp.dive().dive().find('Food')).toHaveProp('meals', [
      {
        id: 5,
        name: 'Something new',
        date: '2018-05-03',
      },
    ]);
  });

  it('triggers home mounted action on mount', () => {
    comp.dive();
    expect(store.getActions()).toEqual([
      { type: 'PAGE_FOOD_ENTERED' },
    ]);
  });
});
