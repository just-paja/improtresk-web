import React from 'react';

import { shallow } from 'enzyme';

import HumanTime from '../HumanTime';

describe('HumanTime component', () => {
  it('renders null given no date is provided time', () => {
    expect(shallow(
      <HumanTime />
    ).getElement()).toEqual(null);
  });

  it('renders human time', () => {
    expect(shallow(
      <HumanTime date="2016-01-02T03:04:05" />
    ).getElement()).toEqual(
      <span>03:04</span>
    );
  });
});
