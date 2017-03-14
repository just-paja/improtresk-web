import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import FoodMenuItem from '../../../src/web/components/foodMenuItem';

describe('FoodMenuItem component', () => {
  it('renders', () => {
    expect(shallow(<FoodMenuItem name="foo" />).node).to.eql(
      <div>foo</div>
    );
  });
});
