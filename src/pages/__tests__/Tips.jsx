import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import Tips from '../Tips';

const mockStore = configureMockStore();

describe('Tips container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: [],
      },
      accomodation: {
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
        capacity: {
          data: [],
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
      texts: {
        tips: {
          data: [
            {
              id: 5,
              name: 'Something new',
            },
          ],
          valid: true,
        },
      },
    });
    comp = shallow(<Tips />, {
      context: { store },
    });
  });

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(Tips))')).toHaveProp('progress', {
      errors: [],
      failed: false,
      loading: false,
      missing: false,
      required: false,
      valid: true,
    });
  });

  it('provides tip list', () => {
    expect(comp.dive().dive().find('Tips')).toHaveProp('tips', [
      {
        id: 5,
        name: 'Something new',
      },
    ]);
  });

  it('triggers tips mounted action on mount', () => {
    comp.dive();
    expect(store.getActions()).toEqual([
      { type: 'PAGE_TIPS_ENTERED' },
    ]);
  });
});
