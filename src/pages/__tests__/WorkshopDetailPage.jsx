import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import WorkshopDetail from '../WorkshopDetailPage';

const mockStore = configureMockStore();

describe('WorkshopDetail container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      workshops: {
        lectors: {
          list: {
            data: [],
            valid: true,
          },
          roles: {
            data: [],
            valid: true,
          },
        },
        detail: {
          data: {
            id: 500,
            name: 'Foo workshop',
            lectors: [],
          },
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
    comp = shallow(<WorkshopDetail match={{ params: { slug: '2017' } }} />, {
      context: { store },
    });
  });

  it('provides progress', () => {
    expect(comp.find('SceneProgress(Connect(WorkshopDetailPage))')).toHaveProp('progress', {
      errors: [],
      failed: false,
      loading: false,
      missing: false,
      required: false,
      valid: true,
    });
  });

  it('triggers archive mounted action on mount', () => {
    comp.dive();
    expect(store.getActions()).toEqual([
      { type: 'PAGE_WORKSHOP_DETAIL_ENTERED', workshop: '2017' },
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
      { type: 'PAGE_WORKSHOP_DETAIL_ENTERED', workshop: '2017' },
      { type: 'PAGE_WORKSHOP_DETAIL_ENTERED', workshop: '2018' },
    ]);
  });
});
