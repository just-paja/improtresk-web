import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Partner from '../../../src/web/components/partner';

describe('Partner component', () => {
  it('renders', () => {
    expect(shallow(<Partner name="foo" logo="bar" />).node).to.eql(
      <div>
        <img alt="foo, logo" src="bar" />
      </div>
    );
  });
});
