import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import HumanDate from '../../../src/web/components/humanDate';
import FoodTime from '../../../src/web/components/foodTime';

describe('Food Time component', () => {
  it('renders link', () => {
    expect(shallow(
      <FoodTime name="Oběd" date="2016-01-02" />
    ).node).to.eql(
      <span>Oběd <HumanDate date="2016-01-02" /></span>
    );
  });
});
