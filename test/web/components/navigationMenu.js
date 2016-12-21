import React from 'react';

import { expect } from 'chai';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { shallow } from 'enzyme';

import NavigationMenu from '../../../src/web/components/navigationMenu';

describe('Navigation component', () => {
  it('renders layout and content', () => {
    expect(shallow(
      <NavigationMenu
        years={['2016', '2017']}
      />
    ).node).to.eql(
      <Nav>
        <LinkContainer to="/pro-ucastniky" >
          <NavItem>Pro účastníky</NavItem>
        </LinkContainer>
        <LinkContainer to="/prihlaska" >
          <NavItem>Přihláška</NavItem>
        </LinkContainer>
        <LinkContainer to="/program" >
          <NavItem>Program</NavItem>
        </LinkContainer>
        <NavDropdown title="Archív">
          <LinkContainer to="/archiv/:2016">
            <NavItem>2016</NavItem>
          </LinkContainer>
          <LinkContainer to="/archiv/:2017">
            <NavItem>2017</NavItem>
          </LinkContainer>
        </NavDropdown>
        <LinkContainer to="/kontakt">
          <NavItem>Kontakt</NavItem>
        </LinkContainer>
      </Nav>
    );
  });
});
