/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Container } from 'reactstrap';

type PropTypes = {
  title: string;
};

const Contact = (props: PropTypes) => (
  <Container>
    <h1>{props.title}</h1>
    <p>...</p>
  </Container>
);

export default Contact;
