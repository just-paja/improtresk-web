import FontAwesome from 'react-fontawesome';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import PropTypes from 'prop-types';
import React from 'react';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import UncontrolledDropdown from 'reactstrap/lib/UncontrolledDropdown';

import { LinkContainer } from 'react-router-bootstrap';

import PermaLinkContainer from './PermaLinkContainer';
import Message from '../containers/Message';

import { reverse } from '../routeTable';

const NavigationMenu = ({
  currentYear,
  lang,
  participant,
  years,
  ...props
}) => {
  const currentYearItems = currentYear ? [
    <UncontrolledDropdown
      nav
      inNavbar
      key="participants"
    >
      <DropdownToggle nav caret>
        <Message name="menu.forParticipants" />
      </DropdownToggle>
      <DropdownMenu>
        <NavItem>
          <LinkContainer to={reverse(lang, 'location')}>
            <NavLink>
              <Message name="menu.locations" />
            </NavLink>
          </LinkContainer>
        </NavItem>
        <NavItem>
          <LinkContainer to={reverse(lang, 'accomodation')}>
            <NavLink>
              <Message name="menu.accomodation" />
            </NavLink>
          </LinkContainer>
        </NavItem>
        <NavItem>
          <LinkContainer to={reverse(lang, 'food')}>
            <NavLink>
              <Message name="menu.food" />
            </NavLink>
          </LinkContainer>
        </NavItem>
        <NavItem>
          <LinkContainer to={reverse(lang, 'fees')}>
            <NavLink>
              <Message name="menu.fees" />
            </NavLink>
          </LinkContainer>
        </NavItem>
        <NavItem>
          <LinkContainer to={reverse(lang, 'conditions')}>
            <NavLink>
              <Message name="menu.conditions" />
            </NavLink>
          </LinkContainer>
        </NavItem>
        <NavItem>
          <LinkContainer to={reverse(lang, 'tips')}>
            <NavLink>
              <Message name="menu.tips" />
            </NavLink>
          </LinkContainer>
        </NavItem>
      </DropdownMenu>
    </UncontrolledDropdown>,
    <NavItem key="workshops">
      <LinkContainer to={reverse(lang, 'workshops')}>
        <NavLink><Message name="menu.workshops" /></NavLink>
      </LinkContainer>
    </NavItem>,
    !participant ? (
      <NavItem key="signup">
        <LinkContainer to={reverse(lang, 'signup')}>
          <NavLink>
            <Message name="menu.signup" />
          </NavLink>
        </LinkContainer>
      </NavItem>
    ) : null,
    <NavItem key="schedule">
      <LinkContainer to={reverse(lang, 'schedule')}>
        <NavLink>
          <Message name="menu.schedule" />
        </NavLink>
      </LinkContainer>
    </NavItem>,
  ] : null;

  return (
    <Nav {...props}>
      {currentYearItems}
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          <Message name="menu.archive" />
        </DropdownToggle>
        <DropdownMenu>
          {(years && years.length ?
            years.map(yearRun => (
              <NavItem key={yearRun.id}>
                <PermaLinkContainer
                  id={yearRun.year}
                  lang={lang}
                  to="archiveYearDetail"
                  title={yearRun.topic}
                >
                  <NavLink>{yearRun.year} - {yearRun.topic}</NavLink>
                </PermaLinkContainer>
              </NavItem>
            )) :
            <NavItem disabled><Message name="menu.archiveEmpty" /></NavItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
      <NavItem>
        <LinkContainer to={reverse(lang, 'contact')}>
          <NavLink>
            <Message name="menu.contact" />
          </NavLink>
        </LinkContainer>
      </NavItem>
      {participant ? ([
        <NavItem divider key="participant-divider" />,
        <NavItem key="participant-link">
          <LinkContainer to={reverse(lang, 'participantHome')}>
            <NavLink><FontAwesome name="user" /> {participant.name}</NavLink>
          </LinkContainer>
        </NavItem>,
      ]) : null}
    </Nav>
  );
};

NavigationMenu.propTypes = {
  currentYear: PropTypes.object,
  lang: PropTypes.string.isRequired,
  participant: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  years: PropTypes.arrayOf(PropTypes.object),
};

NavigationMenu.defaultProps = {
  currentYear: null,
  participant: null,
  years: null,
};

export default NavigationMenu;
