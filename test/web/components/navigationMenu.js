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
        currentYear={{ year: '2017', topic: 'Kůže', current: true }}
        years={[
          { id: 1, year: '2015', topic: 'Foo' },
          { id: 2, year: '2016', topic: 'Bar' },
        ]}
      />
    ).node).to.eql(
      <Nav>
        <NavDropdown id="navigation-dropdown" title="Pro účastníky">
          <LinkContainer to="/pro-ucastniky/lokace">
            <NavItem>Lokace</NavItem>
          </LinkContainer>
          <LinkContainer to="/pro-ucastniky/ubytovani">
            <NavItem>Ubytování</NavItem>
          </LinkContainer>
          <LinkContainer to="/pro-ucastniky/jidlo">
            <NavItem>Jídlo</NavItem>
          </LinkContainer>
          <LinkContainer to="/pro-ucastniky/poplatky">
            <NavItem>Poplatky</NavItem>
          </LinkContainer>
          <LinkContainer to="/jizdomat">
            <NavItem>Improjízdomat</NavItem>
          </LinkContainer>
          <LinkContainer to="/pro-ucastniky/tipy">
            <NavItem>Tipy</NavItem>
          </LinkContainer>
          <LinkContainer to="/pro-ucastniky/podminky">
            <NavItem>Podmínky</NavItem>
          </LinkContainer>
        </NavDropdown>
        <LinkContainer to="/workshopy">
          <NavItem>Workshopy</NavItem>
        </LinkContainer>
        <LinkContainer to="/prihlaska" >
          <NavItem>Přihláška</NavItem>
        </LinkContainer>
        <LinkContainer to="/program" >
          <NavItem>Program</NavItem>
        </LinkContainer>
        <NavDropdown id="navigation-dropdown" title="Archív">
          <LinkContainer to="/archiv/1">
            <NavItem>2015 - Foo</NavItem>
          </LinkContainer>
          <LinkContainer to="/archiv/2">
            <NavItem>2016 - Bar</NavItem>
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
