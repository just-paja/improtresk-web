import React, { PropTypes } from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavDropdown, NavItem } from 'react-bootstrap';

import { reverse } from '../routes';

const NavigationMenu = ({ years, ...props }) => (
  <Nav {...props}>
    <NavDropdown id="navigation-dropdown" title="Pro účastníky">
      <LinkContainer to={reverse('accomodation')}>
        <NavItem>Ubytování</NavItem>
      </LinkContainer>
      <LinkContainer to={reverse('food')}>
        <NavItem>Jídlo</NavItem>
      </LinkContainer>
      <LinkContainer to={reverse('fees')}>
        <NavItem>Poplatky</NavItem>
      </LinkContainer>
      <LinkContainer to={reverse('drive')}>
        <NavItem>Improjízdomat</NavItem>
      </LinkContainer>
      <LinkContainer to={reverse('tips')}>
        <NavItem>Tipy</NavItem>
      </LinkContainer>
      <LinkContainer to={reverse('conditions')}>
        <NavItem>Podmínky</NavItem>
      </LinkContainer>
    </NavDropdown>
    <LinkContainer to={reverse('workshops')}>
      <NavItem>Workshopy</NavItem>
    </LinkContainer>
    <LinkContainer to={reverse('signup')}>
      <NavItem>Přihláška</NavItem>
    </LinkContainer>
    <LinkContainer to={reverse('schedule')}>
      <NavItem>Program</NavItem>
    </LinkContainer>
    <NavDropdown id="navigation-dropdown" title="Archív">
      {(years.length ?
        years.map(yearRun => (
          <LinkContainer
            key={yearRun.year}
            to={reverse('archive:year', { year: yearRun.year })}
          >
            <NavItem>{yearRun.year} - {yearRun.topic}</NavItem>
          </LinkContainer>
        )) :
        <NavItem disabled>Archív je prázdný</NavItem>
      )}
    </NavDropdown>
    <LinkContainer to={reverse('contact')}>
      <NavItem>Kontakt</NavItem>
    </LinkContainer>
  </Nav>
);

NavigationMenu.propTypes = {
  years: PropTypes.arrayOf(PropTypes.object),
};

export default NavigationMenu;
