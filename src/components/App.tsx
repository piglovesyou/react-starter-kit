/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import AppContext, { AppContextTypes } from '../context';

interface Props {
  insertCss: Function;
  client: any;
  context: AppContextTypes;
  children: Node;
}

const App = ({ client, insertCss, context, children }: Props) => (
  <div>boom</div>
);

export default App;
