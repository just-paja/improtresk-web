import FontAwesome from 'react-fontawesome';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import PropTypes from 'prop-types';
import React from 'react';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import UncontrolledDropdown from 'reactstrap/lib/UncontrolledDropdown';

import { LinkContainer } from 'react-router-bootstrap';

import PermaLinkContainer from './PermaLinkContainer';
import Message from '../containers/Message';
import LanguagePicker from '../containers/LanguagePicker';

import { reverse } from '../routeTable';

const stopPropagation = e => e.stopPropagation();

const NavigationMenu = ({
  currentYear,
  lang,
  onLogout,
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
      <DropdownToggle nav caret onClick={stopPropagation}>
        <Message name="menu.forParticipants" />
      </DropdownToggle>
      <DropdownMenu>
        <LinkContainer to={reverse(lang, 'location')}>
          <DropdownItem>
            <Message name="menu.locations" />
          </DropdownItem>
        </LinkContainer>
        <LinkContainer to={reverse(lang, 'accomodation')}>
          <DropdownItem>
            <Message name="menu.accomodation" />
          </DropdownItem>
        </LinkContainer>
        <LinkContainer to={reverse(lang, 'food')}>
          <DropdownItem>
            <Message name="menu.food" />
          </DropdownItem>
        </LinkContainer>
        <LinkContainer to={reverse(lang, 'fees')}>
          <DropdownItem>
            <Message name="menu.fees" />
          </DropdownItem>
        </LinkContainer>
        <LinkContainer to={reverse(lang, 'conditions')}>
          <DropdownItem>
            <Message name="menu.conditions" />
          </DropdownItem>
        </LinkContainer>
        <LinkContainer to={reverse(lang, 'tips')}>
          <DropdownItem>
            <Message name="menu.tips" />
          </DropdownItem>
        </LinkContainer>
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
          <NavLink><Message name="menu.signup" /></NavLink>
        </LinkContainer>
      </NavItem>
    ) : null,
    <NavItem key="schedule">
      <LinkContainer to={reverse(lang, 'schedule')}>
        <NavLink><Message name="menu.schedule" /></NavLink>
      </LinkContainer>
    </NavItem>,
  ] : null;

  return (
    <Nav className="w-100" navbar {...props}>
      {currentYearItems}
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret onClick={stopPropagation}>
          <Message name="menu.archive" />
        </DropdownToggle>
        <DropdownMenu>
          {(years && years.length ?
            years.map(yearRun => (
              <PermaLinkContainer
                id={yearRun.year}
                key={yearRun.id}
                lang={lang}
                to="archiveYearDetail"
                title={yearRun.topic}
              >
                <DropdownItem>
                  {yearRun.year} - {yearRun.topic}
                </DropdownItem>
              </PermaLinkContainer>
            )) :
            <DropdownItem disabled><Message name="menu.archiveEmpty" /></DropdownItem>
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
      <LanguagePicker className="ml-md-auto" />
      {participant ? (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret onClick={stopPropagation}>
            <FontAwesome name="user" /> <span>{participant.name}</span>
          </DropdownToggle>
          <DropdownMenu>
            <LinkContainer to={reverse(lang, 'participantHome')}>
              <DropdownItem><Message name="participants.home" /></DropdownItem>
            </LinkContainer>
            <LinkContainer to={reverse(lang, 'participantChangePassword')}>
              <DropdownItem><Message name="participants.changePassword" /></DropdownItem>
            </LinkContainer>
            <DropdownItem onClick={onLogout}><Message name="participants.logout" /></DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ) : null}
    </Nav>
  );
};

NavigationMenu.propTypes = {
  currentYear: PropTypes.object,
  lang: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
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
