import React from 'react';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';

import HelmetTitle from '../HelmetTitle';

const mockStore = configureStore();

describe('HelmetTitle container', () => {
  let comp;

  beforeEach(() => {
    const store = mockStore({
      locale: {
        languages: ['cs'],
      },
      session: {
        locale: 'cs',
      },
      years: {
        list: {
          data: [
            {
              id: 13,
              current: true,
              year: '2017',
            },
          ],
        },
      },
    });
    comp = shallow(<HelmetTitle title="Some Title" />, {
      context: { store },
    });
  });

  it('provides translate method', () => {
    expect(comp.find('HelmetTitle')).toHaveProp('translate');
  });

  it('provides active year', () => {
    expect(comp.find('HelmetTitle')).toHaveProp('year', {
      id: 13,
      current: true,
      year: '2017',
    });
  });
});
