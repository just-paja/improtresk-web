import Collapse from 'reactstrap/lib/Collapse'
import Container from 'reactstrap/lib/Container'
import Navbar from 'reactstrap/lib/Navbar'
import NavbarBrand from 'reactstrap/lib/NavbarBrand'
import Button from 'reactstrap/lib/Button'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import LinkContainer from '../containers/LinkContainer'
import NavigationMenu from './NavigationMenu'

export default class Navigation extends Component {
  constructor () {
    super()
    this.state = { expanded: false }
    this.collapseMenu = this.collapseMenu.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  collapseMenu () {
    this.setState({ expanded: false })
  }

  toggleMenu (event) {
    if (event) {
      event.stopPropagation()
    }
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    const { currentYear, lang, onLogout, participant, years } = this.props
    return (
      <Navbar color='dark' fixed='top' expand='md' onClick={this.collapseMenu}>
        <Container>
          <LinkContainer to='home'>
            <NavbarBrand href='/'>
              Improtřesk
            </NavbarBrand>
          </LinkContainer>
          <Button className='d-md-none' onClick={this.toggleMenu}>
            <FontAwesome name='bars' />
          </Button>
          <Collapse navbar isOpen={this.state.expanded}>
            <NavigationMenu
              currentYear={currentYear}
              lang={lang}
              onLogout={onLogout}
              participant={participant}
              years={years}
            />
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

Navigation.propTypes = {
  currentYear: PropTypes.object,
  lang: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  participant: PropTypes.object,
  years: PropTypes.arrayOf(PropTypes.object)
}

Navigation.defaultProps = {
  currentYear: null,
  participant: null,
  years: null
}
