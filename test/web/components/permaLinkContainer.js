import NavItem from 'react-bootstrap/lib/NavItem';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import { LinkContainer } from 'react-router-bootstrap';

import PermaLinkContainer from '../../../src/web/components/permaLinkContainer';

describe('Permanent Link Container component', () => {
  it('renders', () => {
    expect(shallow(
      <PermaLinkContainer
        id={1}
        title="Přespříliš žluťoučký kůň úpěl ďábelské ódy"
        to="news:item"
      >
        <NavItem>bar</NavItem>
      </PermaLinkContainer>
    ).node).to.eql(
      <LinkContainer
        to="/novinky/presprilis-zlutoucky-kun-upel-dabelske-ody-1"
      >
        <NavItem>bar</NavItem>
      </LinkContainer>
    );
  });
});
