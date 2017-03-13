import React from 'react';

import { expect } from 'chai';
import { Link as RouterLink } from 'react-router';
import { shallow } from 'enzyme';

import Link from '../../../src/web/components/link';

describe('Link component', () => {
  it('renders', () => {
    expect(shallow(
      <Link to="workshops:item" params={{ slug: 'foo' }} />
    ).node).to.eql(
      <RouterLink to="/workshopy/foo" />
    );
  });
});
