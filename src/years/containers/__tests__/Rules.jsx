import React from 'react';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';

import Rules from '../Rules';

const mockStore = configureStore();

describe('Rules container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: ['cs'],
      },
      years: {
        rules: {
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
    comp = shallow(<Rules />, {
      context: { store },
    });
  });

  it('provides rules', () => {
    expect(comp.dive().dive().find('Rules')).toHaveProp('rules', {
      id: 20,
      createdAt: '2017-03-05T00:00:00',
      name: 'lunch',
      text: 'foo',
      lang: 'cs',
    });
  });

  it('dispatches news required action on mount', () => {
    comp.dive();
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_RULES_REQUIRED',
    }));
  });
});
