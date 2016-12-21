import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import HumanDate from '../../../src/web/components/humanDate';

describe('Human Date component', () => {
  it('renders human date without time and year', () => {
    expect(shallow(
      <HumanDate date="2016-01-02T03:04:05" />
    ).node).to.eql(
      <span>2. 1.</span>
    );
  });

  it('renders human date without time and with year', () => {
    expect(shallow(
      <HumanDate date="2016-01-02T03:04:05" showYear />
    ).node).to.eql(
      <span>2. 1. 2016</span>
    );
  });

  it('renders human date without with time and without year', () => {
    expect(shallow(
      <HumanDate date="2016-01-02T03:04:05" showTime />
    ).node).to.eql(
      <span>2. 1. 03:04</span>
    );
  });

  it('renders human date without with time and year', () => {
    expect(shallow(
      <HumanDate date="2016-01-02T03:04:05" showTime showYear />
    ).node).to.eql(
      <span>2. 1. 2016 03:04</span>
    );
  });
});
