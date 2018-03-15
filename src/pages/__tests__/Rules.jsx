import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import Rules from '../Rules';

const mockStore = configureMockStore();

describe('Rules container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: [],
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
    comp = shallow(<Rules />, {
      context: { store },
    });
  });

  it('provides translate method', () => {
    expect(comp.find('Rules')).toHaveProp('translate');
  });
});
