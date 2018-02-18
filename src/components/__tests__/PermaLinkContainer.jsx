import NavItem from 'reactstrap/lib/NavItem';
import React from 'react';

import { shallow } from 'enzyme';
import { LinkContainer } from 'react-router-bootstrap';

import PermaLinkContainer from '../PermaLinkContainer';

describe('Permanent Link Container component', () => {
  it('renders', () => {
    expect(shallow(
      <PermaLinkContainer
        lang="cs"
        id={1}
        title="Přespříliš žluťoučký kůň úpěl ďábelské ódy"
        to="newsDetail"
      >
        <NavItem>bar</NavItem>
      </PermaLinkContainer>
    ).getElement()).toEqual(
      <LinkContainer
        to="/cs/novinky/presprilis-zlutoucky-kun-upel-dabelske-ody-1"
      >
        <NavItem>bar</NavItem>
      </LinkContainer>
    );
  });

  it('does not fail when given no route params', () => {
    expect(() => {
      shallow(
        <PermaLinkContainer
          lang="cs"
          id={1}
          title="Přespříliš žluťoučký kůň úpěl ďábelské ódy"
          to="newsDetail"
        >
          <NavItem>bar</NavItem>
        </PermaLinkContainer>
      );
    }).not.toThrow();
  });
});
