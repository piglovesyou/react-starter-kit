/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Navigation = (props: { createGotoProps: Function }) => {
  const { createGotoProps } = props;

  return (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink {...createGotoProps('/about')}>About</NavLink>
      </NavItem>
      <NavItem>
        <NavLink {...createGotoProps('/contact')}>Contact</NavLink>
      </NavItem>
      <NavItem>
        <NavLink {...createGotoProps('/login')}>Log in</NavLink>
      </NavItem>
      <NavItem>
        <NavLink {...createGotoProps('/register')}>Sign up</NavLink>
      </NavItem>
    </Nav>
  );
};

export default Navigation;
