import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import HumanDate from '../../../src/web/components/humanDate';
import Meal from '../../../src/web/components/meal';

describe('Meal component', () => {
  it('renders link', () => {
    expect(shallow(
      <Meal name="lunch" date="2016-01-02" />
    ).node).to.eql(
      <span>Oběd <HumanDate date="2016-01-02" /></span>
    );
  });
  it('renders link with unknown name', () => {
    expect(shallow(
      <Meal name="Bug" date="2016-01-02" />
    ).node).to.eql(
      <span>Bug <HumanDate date="2016-01-02" /></span>
    );
  });
});
