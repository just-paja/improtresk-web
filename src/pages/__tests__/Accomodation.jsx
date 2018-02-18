import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import Accomodation from '../Accomodation';

const mockStore = configureMockStore();

describe('Accomodation container', () => {
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
        list: {
          'accomodation-intro': {
            data: {
              text: 'foo',
            },
            valid: true,
          },
        },
      },
    });
    comp = shallow(<Accomodation />, {
      context: { store },
    });
  });

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(Accomodation))')).toHaveProp('progress', {
      failed: false,
      loading: false,
      missing: false,
      required: false,
      valid: true,
      errors: [],
    });
  });

  it('provides accomodation list', () => {
    expect(comp.dive().dive().find('Accomodation')).toHaveProp('accomodationList', [
      {
        id: 5,
        name: 'Something new',
        capacityStatus: {},
      },
    ]);
  });

  it('triggers home mounted action on mount', () => {
    comp.dive().dive();
    expect(store.getActions()).toEqual([
      { type: 'PAGE_ACCOMODATION_ENTERED' },
    ]);
  });

  it('triggers home left action on exit', () => {
    const page = comp.dive();
    page.simulate('exit');
    expect(store.getActions()).toEqual([
      { type: 'PAGE_ACCOMODATION_ENTERED' },
      { type: 'PAGE_ACCOMODATION_LEFT' },
    ]);
  });
});
