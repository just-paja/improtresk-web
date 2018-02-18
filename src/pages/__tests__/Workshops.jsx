import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import Workshops from '../Workshops';

const mockStore = configureMockStore();

describe('Workshops container', () => {
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
      workshops: {
        lectors: {
          data: [],
          valid: true,
        },
        list: {
          data: [],
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
      texts: {},
    });
    comp = shallow(<Workshops />, {
      context: { store },
    });
  });

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(Workshops))')).toHaveProp('progress', {
      failed: false,
      loading: false,
      missing: false,
      required: false,
      valid: true,
      errors: [],
    });
  });

  it('provides translate method', () => {
    expect(comp.dive().dive().find('Workshops')).toHaveProp('translate');
  });

  it('triggers home mounted action on mount', () => {
    comp.dive();
    expect(store.getActions()).toEqual([
      { type: 'PAGE_WORKSHOPS_ENTERED' },
    ]);
  });

  it('triggers home mounted action on exit', () => {
    const page = comp.dive();
    page.simulate('exit');
    expect(store.getActions()).toEqual([
      { type: 'PAGE_WORKSHOPS_ENTERED' },
      { type: 'PAGE_WORKSHOPS_LEFT' },
    ]);
  });
});
