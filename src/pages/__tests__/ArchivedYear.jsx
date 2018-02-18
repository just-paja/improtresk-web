import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import ArchivedYear from '../ArchivedYear';

const mockStore = configureMockStore();

describe('ArchivedYear container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
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
        archive: {
          data: {
            id: 150,
            year: '2017',
            topic: 'foo',
          },
          valid: true,
        },
        capacity: {
          data: [],
          valid: true,
        },
        list: {
          data: [
            {
              id: 150,
              year: '2017',
              topic: 'foo',
            },
          ],
          valid: true,
        },
      },
      texts: {},
    });
    comp = shallow(<ArchivedYear match={{ params: { slug: '2017' } }} />, {
      context: { store },
    });
  });

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(ArchivedYear))')).toHaveProp('progress', {
      errors: [],
      failed: false,
      loading: false,
      missing: false,
      required: false,
      valid: true,
    });
  });

  it('provides topic', () => {
    expect(comp.dive().dive().find('ArchivedYear')).toHaveProp('topic', 'foo');
  });

  it('triggers archive mounted action on mount', () => {
    comp.dive();
    expect(store.getActions()).toEqual([
      { type: 'PAGE_ARCHIVED_YEAR_ENTERED', year: '2017' },
    ]);
  });

  it('triggers archive mounted action on update', () => {
    const page = comp.dive();
    page.setProps({
      match: {
        params: {
          slug: '2018',
        },
      },
    });
    page.unmount();
    expect(store.getActions()).toEqual([
      { type: 'PAGE_ARCHIVED_YEAR_ENTERED', year: '2017' },
      { type: 'PAGE_ARCHIVED_YEAR_ENTERED', year: '2018' },
    ]);
  });
});
