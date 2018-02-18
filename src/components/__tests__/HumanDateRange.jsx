import React from 'react';

import { shallow } from 'enzyme';

import HumanDate from '../HumanDate';
import HumanDateRange from '../HumanDateRange';

describe('Human Date Range component', () => {
  it('renders human date range where first date has no year', () => {
    expect(shallow(
      <HumanDateRange
        start="2016-01-02"
        end="2016-03-04"
      />
    ).getElement()).toEqual(
      <span>
        <HumanDate date="2016-01-02" showYear={false} />
        {' '}-{' '}
        <HumanDate date="2016-03-04" />
      </span>
    );
  });
});
