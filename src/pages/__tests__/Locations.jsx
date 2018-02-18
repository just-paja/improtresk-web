import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import Locations from '../Locations';

const mockStore = configureMockStore();

describe('Locations container', () => {
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
      geocode: {
        'Nádražní 23/12': {
          data: {
            lat: 23.334,
            lng: 56.776,
          },
          valid: true,
        },
      },
      locale: {
        languages: [],
      },
      texts: {
        list: {
          'locations-intro': {
            data: {
              text: 'foo',
            },
            valid: true,
          },
        },
      },
      workshops: {
        locations: {
          data: [
            {
              id: 15,
              name: 'DK Milevsko',
              address: 'Nádražní 23/12',
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
    });
    comp = shallow(<Locations />, {
      context: { store },
    });
  });

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(Locations))')).toHaveProp('progress', {
      failed: false,
      loading: false,
      missing: false,
      required: false,
      valid: true,
      errors: [],
    });
  });

  it('provides marker list', () => {
    expect(comp.dive().dive().find('Locations')).toHaveProp('markers', [
      {
        address: 'Nádražní 23/12',
        id: 15,
        lat: 23.334,
        lng: 56.776,
        name: 'DK Milevsko',
      },
    ]);
  });

  it('provides translate method', () => {
    expect(comp.dive().dive().find('Locations')).toHaveProp('translate');
  });

  it('triggers location page entered action on mount', () => {
    comp.dive();
    expect(store.getActions()).toEqual([
      { type: 'PAGE_LOCATIONS_ENTERED' },
    ]);
  });
});
