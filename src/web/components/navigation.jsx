import Navbar from 'react-bootstrap/lib/Navbar';
import React, { PropTypes } from 'react';

import Link from './link';
import NavigationMenu from './navigationMenu';

const Navigation = ({ years }) => (
  <Navbar fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="home">Improtřesk</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <NavigationMenu years={years} />
    </Navbar.Collapse>
  </Navbar>
);

Navigation.propTypes = {
  years: PropTypes.arrayOf(PropTypes.object),
};

export default Navigation;
