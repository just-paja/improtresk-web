import React from 'react';

import { shallow } from 'enzyme';

import HumanDate from '../../../components/HumanDate';
import Meal from '../Meal';

describe('Meal component', () => {
  it('renders link', () => {
    expect(shallow(
      <Meal name="lunch" date="2016-01-02" />
    )).toMatchElement(
      <span>
        Oběd
        {' '}
        <HumanDate date="2016-01-02" />
      </span>
    );
  });

  it('renders link with unknown name', () => {
    expect(shallow(
      <Meal name="Bug" date="2016-01-02" />
    )).toMatchElement(
      <span>
        Bug
        {' '}
        <HumanDate date="2016-01-02" />
      </span>
    );
  });
});
