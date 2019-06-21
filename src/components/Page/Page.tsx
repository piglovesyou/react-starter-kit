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

interface PropTypes {
  title: string;
  html: string;
}

const Page = ({ title, html }: PropTypes) => (
  <Container>
    <h1>{title}</h1>
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </Container>
);

export default Page;
