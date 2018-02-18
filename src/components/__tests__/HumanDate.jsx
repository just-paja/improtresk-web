import React from 'react';

import { shallow } from 'enzyme';

import HumanDate from '../HumanDate';

describe('Human Date component', () => {
  it('renders null given no date is provided', () => {
    expect(shallow(
      <HumanDate />
    ).getElement()).toEqual(null);
  });

  it('renders human date without time and year', () => {
    expect(shallow(
      <HumanDate date="2016-01-02T03:04:05" />
    ).getElement()).toEqual(
      <span>2. 1.</span>
    );
  });

  it('renders human date without time and with year', () => {
    expect(shallow(
      <HumanDate date="2016-01-02T03:04:05" showYear />
    ).getElement()).toEqual(
      <span>2. 1. 2016</span>
    );
  });

  it('renders human date without with time and without year', () => {
    expect(shallow(
      <HumanDate date="2016-01-02T03:04:05" showTime />
    ).getElement()).toEqual(
      <span>2. 1. 03:04</span>
    );
  });

  it('renders human date without with time and year', () => {
    expect(shallow(
      <HumanDate date="2016-01-02T03:04:05" showTime showYear />
    ).getElement()).toEqual(
      <span>2. 1. 2016 03:04</span>
    );
  });
});
