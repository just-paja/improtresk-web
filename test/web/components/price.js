import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Price from '../../../src/web/components/price';

describe('Price component', () => {
  it('renders price', () => {
    expect(shallow(
      <Price price={153} />
    ).node).to.eql(
      <span>153 Kč</span>
    );
  });

  it('renders free with default message', () => {
    expect(shallow(
      <Price price={0} />
    ).node).to.eql(
      <span>Zdarma</span>
    );
  });

  it('renders free with custom message', () => {
    expect(shallow(
      <Price freeMessage="V ceně přihlášky" price={0} />
    ).node).to.eql(
      <span>V ceně přihlášky</span>
    );
  });
});
