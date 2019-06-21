/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import useStyles from 'isomorphic-style-loader/useStyles';
import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import history from '../../history';
import Navigation from '../Navigation';
import s from './Header.css';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

const Header = () => {
  useStyles(s);
  const [isOpen, setOpen] = useState(false);

  const createGotoProps = (path: string) => {
    return {
      onClick: (e: any) => {
        e.preventDefault();
        setOpen(false);
        history.push(path);
      },
      href: path,
    };
  };

  return (
    <Navbar className="bg-secondary" dark expand="md">
      <NavbarBrand {...createGotoProps('/')}>
        <img
          src={logoUrl}
          srcSet={`${logoUrl2x} 2x`}
          width="38"
          height="38"
          alt="React"
        />
        <span>Your Company</span>
      </NavbarBrand>
      <NavbarToggler onClick={() => setOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Navigation createGotoProps={createGotoProps} />
      </Collapse>
    </Navbar>
  );
};

export default Header;
