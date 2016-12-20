import React from 'react';

import { Link } from 'react-router';
import { Navbar } from 'react-bootstrap';

import NavigationMenu from './navigationMenu';

const Navigation = () => (
  <Navbar fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Improtřesk</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <NavigationMenu />
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
