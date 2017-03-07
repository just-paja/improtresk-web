import React from 'react';

import { expect } from 'chai';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { shallow } from 'enzyme';

import NavigationMenu from '../../../src/web/components/navigationMenu';
import PermaLinkContainer from '../../../src/web/components/permaLinkContainer';

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
          <PermaLinkContainer id="2015" title="Foo" to="archive:year">
            <NavItem>2015 - Foo</NavItem>
          </PermaLinkContainer>
          <PermaLinkContainer id="2016" title="Bar" to="archive:year">
            <NavItem>2016 - Bar</NavItem>
          </PermaLinkContainer>
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
  it('renders with participant', () => {
    expect(shallow(
      <NavigationMenu
        participant={{
          name: 'foo',
        }}
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
        <NavItem divider />
        <LinkContainer to="/ucastnik">
          <NavItem>foo</NavItem>
        </LinkContainer>
      </Nav>
    );
  });
});
