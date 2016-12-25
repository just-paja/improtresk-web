import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Address from '../../../src/web/components/address';

describe('Address component', () => {
  it('renders link', () => {
    expect(shallow(
      <Address address="foo" />
    ).node).to.eql(
      <a href="https://maps.google.com/?q=foo">foo</a>
    );
  });
});
