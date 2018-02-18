import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import Conditions from '../Conditions';

const mockStore = configureMockStore();

describe('Conditions container', () => {
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
        conditions: {
          data: {
            text: 'foo',
          },
          valid: true,
        },
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
      texts: {},
    });
    comp = shallow(<Conditions />, {
      context: { store },
    });
  });

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(Conditions))')).toHaveProp('progress', {
      failed: false,
      loading: false,
      missing: false,
      required: false,
      valid: true,
      errors: [],
    });
  });

  it('provides conditions', () => {
    expect(comp.dive().dive().find('Conditions')).toHaveProp('conditions', {
      text: 'foo',
    });
  });

  it('triggers home mounted action on mount', () => {
    comp.dive();
    expect(store.getActions()).toEqual([
      { type: 'PAGE_CONDITIONS_ENTERED' },
    ]);
  });
});
