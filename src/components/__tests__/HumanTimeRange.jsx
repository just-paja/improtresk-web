import React from 'react';

import { shallow } from 'enzyme';

import HumanTime from '../HumanTime';
import HumanTimeRange from '../HumanTimeRange';

describe('HumanTimeRange component', () => {
  it('renders human date range where first date has no year', () => {
    expect(shallow(
      <HumanTimeRange
        start="2016-01-02T01:02:03"
        end="2016-03-04T01:02:03"
      />
    ).getElement()).toEqual(
      <span>
        <HumanTime date="2016-01-02T01:02:03" />
        &nbsp;-&nbsp;
        <HumanTime date="2016-03-04T01:02:03" />
      </span>
    );
  });
});
