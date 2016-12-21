import React, { PropTypes } from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavDropdown, NavItem } from 'react-bootstrap';

const NavigationMenu = ({ years, ...props }) => (
  <Nav {...props}>
    <LinkContainer to="/pro-ucastniky">
      <NavItem>Pro účastníky</NavItem>
    </LinkContainer>
    <LinkContainer to="/prihlaska">
      <NavItem>Přihláška</NavItem>
    </LinkContainer>
    <LinkContainer to="/program">
      <NavItem>Program</NavItem>
    </LinkContainer>
    <NavDropdown id="navigation-dropdown" title="Archív">
      {(years.length ?
        years.map(yearRun => (
          <LinkContainer key={yearRun.year} to={`/archiv/:${yearRun.year}`}>
            <NavItem>{yearRun.year} - {yearRun.topic}</NavItem>
          </LinkContainer>
        )) :
        <NavItem disabled>Archív je prázdný</NavItem>
      )}
    </NavDropdown>
    <LinkContainer to="/kontakt">
      <NavItem>Kontakt</NavItem>
    </LinkContainer>
  </Nav>
);

NavigationMenu.propTypes = {
  years: PropTypes.arrayOf(PropTypes.object),
};

export default NavigationMenu;
