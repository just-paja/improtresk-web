import Navbar from 'react-bootstrap/lib/Navbar';
import React, { Component, PropTypes } from 'react';

import Link from './link';
import NavigationMenu from './navigationMenu';

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = { expanded: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(expanded) {
    this.setState({ expanded });
  }

  render() {
    const { currentYear, years } = this.props;
    return (
      <Navbar
        fixedTop
        onSelect={this.toggleMenu}
        onToggle={this.toggleMenu}
        expanded={this.state.expanded}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="home">Improtřesk</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <NavigationMenu currentYear={currentYear} years={years} />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  currentYear: PropTypes.object,
  years: PropTypes.arrayOf(PropTypes.object),
};

Navigation.defaultProps = {
  currentYear: null,
  years: null,
};
