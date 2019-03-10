import React from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from 'reactstrap';

export default () => (
  <Navbar color="light" light expand="md">
    <NavbarBrand href="/" data-test-id="landing-page-link">
      Game
    </NavbarBrand>
    <Collapse navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/profile" data-test-id="update-profile">
            Profile
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
);
