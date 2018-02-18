import React from 'react';

import { shallow } from 'enzyme';

import ResourceLoader from '../ResourceLoader';

describe('ResourceLoader component', () => {
  it('renders as div', () => {
    const comp = shallow(<ResourceLoader />);
    expect(comp.is('div')).toBeTruthy();
  });
});
