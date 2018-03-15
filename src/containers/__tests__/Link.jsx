import React from 'react';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';

import Link from '../Link';

const mockStore = configureStore();

describe('Link container', () => {
  let comp;

  beforeEach(() => {
    const store = mockStore({
      locale: {
        languages: ['cs'],
      },
      session: {
        locale: 'cs',
      },
    });
    comp = shallow(<Link to="foo" />, {
      context: { store },
    });
  });

  it('provides language', () => {
    expect(comp.find('Link')).toHaveProp('lang', 'cs');
  });
});
