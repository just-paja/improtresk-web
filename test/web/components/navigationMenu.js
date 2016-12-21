import React from 'react';

import { expect } from 'chai';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { shallow } from 'enzyme';

import NavigationMenu from '../../../src/web/components/navigationMenu';

describe('Navigation menu component', () => {
  it('renders layout and content', () => {
    expect(shallow(
      <NavigationMenu
        years={[
          { year: '2016', topic: 'Foo' },
          { year: '2017', topic: 'Bar' },
        ]}
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
        <NavDropdown id="navigation-dropdown" title="Archív">
          <LinkContainer to="/archiv/:2016">
            <NavItem>2016 - Foo</NavItem>
          </LinkContainer>
          <LinkContainer to="/archiv/:2017">
            <NavItem>2017 - Bar</NavItem>
          </LinkContainer>
        </NavDropdown>
        <LinkContainer to="/kontakt">
          <NavItem>Kontakt</NavItem>
        </LinkContainer>
      </Nav>
    );
  });
  it('renders empty', () => {
    expect(shallow(
      <NavigationMenu
        years={[]}
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
        <NavDropdown id="navigation-dropdown" title="Archív">
          <NavItem disabled>Archív je prázdný</NavItem>
        </NavDropdown>
        <LinkContainer to="/kontakt">
          <NavItem>Kontakt</NavItem>
        </LinkContainer>
      </Nav>
    );
  });
});
