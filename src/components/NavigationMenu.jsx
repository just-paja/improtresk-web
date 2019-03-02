import FontAwesome from 'react-fontawesome'
import Nav from 'reactstrap/lib/Nav'
import NavItem from 'reactstrap/lib/NavItem'
import NavLink from 'reactstrap/lib/NavLink'
import PropTypes from 'prop-types'
import React from 'react'
import DropdownToggle from 'reactstrap/lib/DropdownToggle'
import DropdownMenu from 'reactstrap/lib/DropdownMenu'
import DropdownItem from 'reactstrap/lib/DropdownItem'
import UncontrolledDropdown from 'reactstrap/lib/UncontrolledDropdown'

import { LinkContainer } from 'react-router-bootstrap'

import PermaLinkContainer from './PermaLinkContainer'
import Message from '../containers/Message'
import LanguagePicker from '../containers/LanguagePicker'

import { reverse } from '../routeTable'

const stopPropagation = e => e.stopPropagation()

const renderNavLink = (lang, path, label) => (
  <NavItem key={path}>
    <LinkContainer to={reverse(lang, path)}>
      <NavLink><Message name={label} /></NavLink>
    </LinkContainer>
  </NavItem>
)

const renderDropDownItem = (lang, path, label) => (
  <LinkContainer key={path} to={reverse(lang, path)}>
    <DropdownItem>
      <Message name={label} />
    </DropdownItem>
  </LinkContainer>
)

const renderDropDown = (label, children, rawLabel = null) => (
  <UncontrolledDropdown key={label} nav inNavbar>
    <DropdownToggle nav caret onClick={stopPropagation}>
      {rawLabel || <Message name={label} />}
    </DropdownToggle>
    <DropdownMenu>
      {children}
    </DropdownMenu>
  </UncontrolledDropdown>
)

const renderActiveYearMenuItems = (lang, currentYear, participant) => (
  currentYear ? [
    renderDropDown('menu.forParticipants', [
      renderDropDownItem(lang, 'location', 'menu.locations'),
      renderDropDownItem(lang, 'accomodation', 'menu.accomodation'),
      renderDropDownItem(lang, 'food', 'menu.food'),
      renderDropDownItem(lang, 'fees', 'menu.fees'),
      renderDropDownItem(lang, 'conditions', 'menu.conditions'),
      renderDropDownItem(lang, 'tips', 'menu.tips')
    ]),
    renderNavLink(lang, 'workshops', 'menu.workshops'),
    !participant ? renderNavLink(lang, 'signup', 'menu.signup') : null,
    renderNavLink(lang, 'schedule', 'menu.schedule')
  ] : null
)

const renderArchiveDropdown = (lang, years) => renderDropDown(
  'menu.archive',
  years && years.length ? years.map(yearRun => (
    <PermaLinkContainer
      id={yearRun.year}
      key={yearRun.id}
      lang={lang}
      to='archiveYearDetail'
      title={yearRun.topic || ''}
    >
      <DropdownItem>{yearRun.year} - {yearRun.topic}</DropdownItem>
    </PermaLinkContainer>
  )) : <DropdownItem disabled><Message name='menu.archiveEmpty' /></DropdownItem>
)

const NavigationMenu = ({
  currentYear,
  lang,
  onLogout,
  participant,
  years,
  ...props
}) => (
  <Nav className='w-100' navbar {...props}>
    {renderActiveYearMenuItems(lang, currentYear, participant)}
    {renderArchiveDropdown(lang, years)}
    {renderNavLink(lang, 'contact', 'menu.contact')}
    <LanguagePicker className='ml-md-auto' />
    {participant ? renderDropDown('menu.participant', [
      renderDropDownItem(lang, 'participantHome', 'participants.home'),
      renderDropDownItem(lang, 'participantChangePassword', 'participants.changePassword'),
      <DropdownItem key='logout' onClick={onLogout}><Message name='participants.logout' /></DropdownItem>
    ], <span><FontAwesome name='user' /> <span>{participant.name}</span></span>) : null}
  </Nav>
)

NavigationMenu.propTypes = {
  currentYear: PropTypes.object,
  lang: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  participant: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  years: PropTypes.arrayOf(PropTypes.object)
}

NavigationMenu.defaultProps = {
  currentYear: null,
  participant: null,
  years: null
}

export default NavigationMenu
