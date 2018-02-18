import React from 'react';

import { shallow } from 'enzyme';

import Partner from '../Partner';

describe('Partner component', () => {
  it('renders', () => {
    expect(shallow(<Partner name="foo" logo="bar" />).getElement()).toEqual(
      <div>
        <img alt="foo, logo" src="bar" />
      </div>
    );
  });
});
