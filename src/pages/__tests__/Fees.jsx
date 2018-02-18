import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import Fees from '../Fees';

const mockStore = configureMockStore();

describe('Fees container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: [],
      },
      texts: {},
    });
    comp = shallow(<Fees />, {
      context: { store },
    });
  });

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(Fees))')).toHaveProp('progress', {
      failed: false,
      loading: false,
      missing: false,
      required: true,
      valid: false,
      errors: [],
    });
  });

  it('triggers home mounted action on mount', () => {
    comp.dive();
    expect(store.getActions()).toEqual([
      { type: 'PAGE_FEES_ENTERED' },
    ]);
  });
});
