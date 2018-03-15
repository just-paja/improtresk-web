import React from 'react';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';

import MealList from '../MealList';

const mockStore = configureStore();

describe('MealList container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: ['cs'],
      },
      food: {
        list: {
          valid: true,
          data: [
            {
              id: 20,
              date: '2017-03-05',
              name: 'lunch',
            },
          ],
        },
      },
    });
    comp = shallow(<MealList to="foo" />, {
      context: { store },
    });
  });

  it('provides list of meals', () => {
    expect(comp.dive().dive().find('MealList')).toHaveProp('mealList', [
      {
        id: 20,
        date: '2017-03-05',
        name: 'lunch',
      },
    ]);
  });

  it('dispatches meals required action on mount', () => {
    comp.dive();
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: 'MEALS_REQUIRED',
    }));
  });
});
