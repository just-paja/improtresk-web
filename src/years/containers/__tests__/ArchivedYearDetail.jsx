import React from 'react';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';

import ArchivedYearDetail from '../ArchivedYearDetail';

const mockStore = configureStore();

describe('ArchivedYearDetail container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: ['cs'],
      },
      years: {
        archive: {
          valid: true,
          data: {
            id: 20,
            createdAt: '2017-03-05T00:00:00',
            name: 'lunch',
            topic: 'Sladíme se společně',
            lang: 'cs',
            year: '2018',
          },
        },
      },
    });
    comp = shallow(<ArchivedYearDetail resourceId="2018" />, {
      context: { store },
    });
  });

  it('provides translate method', () => {
    expect(comp.dive().dive().find('ArchivedYearDetail')).toHaveProp('translate');
  });

  it('provides year number', () => {
    expect(comp.dive().dive().find('ArchivedYearDetail')).toHaveProp('year', '2018');
  });

  it('provides year topic', () => {
    expect(comp.dive().dive().find('ArchivedYearDetail')).toHaveProp('topic', 'Sladíme se společně');
  });

  it('provides year workshops', () => {
    expect(comp.dive().dive().find('ArchivedYearDetail')).toHaveProp('workshops', []);
  });

  it('dispatches year detail required action on mount', () => {
    comp.dive();
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_DETAIL_REQUIRED',
      year: '2018',
    }));
  });
});
