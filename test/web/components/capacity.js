import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Capacity from '../../../src/web/components/capacity';

describe('Capacity component', () => {
  it('renders 15 of 20', () => {
    expect(shallow(
      <Capacity available={15} capacity={20} />
    ).node).to.eql(
      <span>15 z 20</span>
    );
  });

  it('renders 20', () => {
    expect(shallow(
      <Capacity available={null} capacity={20} />
    ).node).to.eql(
      <span>20</span>
    );
  });

  it('renders default blocked message', () => {
    expect(shallow(
      <Capacity available={0} capacity={20} />
    ).node).to.eql(
      <span>obsazeno</span>
    );
  });

  it('renders custom blocked message', () => {
    expect(shallow(
      <Capacity available={0} blockedMessage="foo" capacity={20} />
    ).node).to.eql(
      <span>foo</span>
    );
  });
});
