import React from 'react';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';

import MultiLingualMarkdown from '../MultiLingualMarkdown';

const mockStore = configureStore();

describe('MultiLingualMarkdown container', () => {
  let comp;

  beforeEach(() => {
    const store = mockStore({
      session: {
        locale: 'cs-CZ',
      },
    });
    comp = shallow(<MultiLingualMarkdown />, {
      context: { store },
    });
  });

  it('provides selected language', () => {
    expect(comp.find('MultiLingualMarkdown')).toHaveProp('lang', 'cs');
  });
});
