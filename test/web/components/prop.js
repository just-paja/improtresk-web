import FontAwesome from 'react-fontawesome';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Prop from '../../../src/web/components/prop';

describe('Prop component', () => {
  it('renders', () => {
    expect(shallow(
      <Prop label="Prop Label" icon="Prop Icon">foo</Prop>
    ).node).to.eql(
      <li>
        <FontAwesome name="Prop Icon" /> Prop Label:{' '}
        foo
      </li>
    );
  });
  it('renders without icon', () => {
    expect(shallow(
      <Prop label="Prop Label">foo</Prop>
    ).node).to.eql(
      <li>
        Prop Label:{' '}
        foo
      </li>
    );
  });
  it('renders empty without children', () => {
    expect(shallow(
      <Prop label="Prop Label" />
    ).node).to.equal(null);
  });
});
