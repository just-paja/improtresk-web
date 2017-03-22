import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import HumanTime from '../../../src/web/components/humanTime';

describe('HumanTime component', () => {
  it('renders human time', () => {
    expect(shallow(
      <HumanTime date="2016-01-02T03:04:05" />
    ).node).to.eql(
      <span>03:04</span>
    );
  });
});
