import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import NavItem from 'react-bootstrap/lib/NavItem';
import React, { PropTypes } from 'react';

import { LinkContainer } from 'react-router-bootstrap';

import PermaLinkContainer from './permaLinkContainer';

import { reverse } from '../routes';

const NavigationMenu = ({ currentYear, years, ...props }) => {
  const currentYearItems = currentYear ? [
    <NavDropdown key="participants" id="navigation-dropdown" title="Pro účastníky">
      <LinkContainer to={reverse('location')}>
        <NavItem>Lokace</NavItem>
      </LinkContainer>
      <LinkContainer to={reverse('accomodation')}>
        <NavItem>Ubytování</NavItem>
      </LinkContainer>
      <LinkContainer to={reverse('food')}>
        <NavItem>Jídlo</NavItem>
      </LinkContainer>
      <LinkContainer to={reverse('fees')}>
        <NavItem>Poplatky</NavItem>
      </LinkContainer>
      <LinkContainer to={reverse('conditions')}>
        <NavItem>Podmínky</NavItem>
      </LinkContainer>
    </NavDropdown>,
    <LinkContainer key="workshops" to={reverse('workshops')}>
      <NavItem>Workshopy</NavItem>
    </LinkContainer>,
    <LinkContainer key="signup" to={reverse('signup')}>
      <NavItem>Přihláška</NavItem>
    </LinkContainer>,
    <LinkContainer key="schedule" to={reverse('schedule')}>
      <NavItem>Program</NavItem>
    </LinkContainer>,
  ] : null;

  return (
    <Nav {...props}>
      {currentYearItems}
      <NavDropdown id="navigation-dropdown" title="Archív">
        {(years.length ?
          years.map(yearRun => (
            <PermaLinkContainer
              id={yearRun.id}
              key={yearRun.id}
              to="archive:year"
              title={`${yearRun.year} - ${yearRun.topic}`}
            >
              <NavItem>
                {yearRun.year} - {yearRun.topic}
              </NavItem>
            </PermaLinkContainer>
          )) :
          <NavItem disabled>Archív je prázdný</NavItem>
        )}
      </NavDropdown>
      <LinkContainer to={reverse('contact')}>
        <NavItem>Kontakt</NavItem>
      </LinkContainer>
    </Nav>
  );
};

NavigationMenu.propTypes = {
  currentYear: PropTypes.object,
  years: PropTypes.arrayOf(PropTypes.object).isRequired,
};

NavigationMenu.defaultProps = {
  currentYear: null,
};

export default NavigationMenu;
