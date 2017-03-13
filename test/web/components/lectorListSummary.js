import FontAwesome from 'react-fontawesome';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import LectorListSummary from '../../../src/web/components/lectorListSummary';

describe('LectorListSummary component', () => {
  it('renders', () => {
    expect(shallow(
      <LectorListSummary
        name="Jakub Troják"
        position="Hlavní lektor"
      />
    ).node).to.eql(
      <li>
        <FontAwesome name="user" />
        {' '}
        <b>Hlavní lektor:</b>
        {' '}
        Jakub Troják
      </li>
    );
  });
});
