import React from 'react';

import { shallow } from 'enzyme';

import NotFound from '../NotFound';

describe('Not Found error component', () => {
  it('renders', () => {
    expect(() => shallow(<NotFound />)).not.toThrow();
  });
});
