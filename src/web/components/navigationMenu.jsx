import React, { PropTypes } from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const NavigationMenu = props => (
  <Nav {...props}>
    <LinkContainer onlyActiveOnIndex to="/" >
      <NavItem>Home</NavItem>
    </LinkContainer>
    <LinkContainer to="/archiv" >
      <NavItem>Archiv</NavItem>
    </LinkContainer>
    <LinkContainer to="/kontakt">
      <NavItem>Kontakt</NavItem>
    </LinkContainer>
  </Nav>
);

NavigationMenu.propTypes = {
  years: PropTypes.arrayOf(PropTypes.string),
};

export default NavigationMenu;
