/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import animateStyle from 'animate.css';
import useStyles from 'isomorphic-style-loader/useStyles';
import React, { FunctionComponent } from 'react';
import ReactNotification from 'react-notifications-component';
import theme from '!isomorphic-style-loader!css-loader?modules=global!sass-loader!../theme.scss'; // eslint-disable-line import/no-unresolved
import Feedback from '../Feedback';
import Footer from '../Footer';
import Header from '../Header';
import { notifStyles, useNotif } from '../Notification';
import s from './Layout.css';

const Layout: FunctionComponent<{}> = ({ children }) => {
  useStyles(theme, animateStyle, ...notifStyles, s);
  const { notifContainerRef } = useNotif();
  return (
    <div>
      <ReactNotification ref={notifContainerRef} />
      <Header />
      {children}
      <Feedback />
      <Footer />
    </div>
  );
};

export default Layout;
