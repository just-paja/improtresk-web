import React from 'react';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';

import LinkContainer from '../LinkContainer';

const mockStore = configureStore();

describe('LinkContainer container', () => {
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
    comp = shallow(<LinkContainer to="foo" />, {
      context: { store },
    });
  });

  it('provides language', () => {
    expect(comp.find('LinkContainer')).toHaveProp('lang', 'cs');
  });
});
