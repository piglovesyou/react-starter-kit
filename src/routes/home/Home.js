/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import gql from 'graphql-tag';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { compose, graphql, Mutation } from 'react-apollo';
import s from './Home.css';
import newsQuery from './news.graphql';

class Home extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      reactjsGetAllNews: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          link: PropTypes.string.isRequired,
          content: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  render() {
    const {
      data: {
        loading,
        reactjsGetAllNews,
        networkStatus: { isConnected },
      },
    } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Mutation
            mutation={gql`
              mutation {
                modify
              }
            `}
          >
            {(modify, { data }) => {
              const { modify: modifiedData } = data || {};
              return (
                <>
                  <button onClick={() => modify()}>MODIFY</button>
                  {modifiedData && ` (Clicked ${modifiedData} times)`}
                </>
              );
            }}
          </Mutation>
          <p className={s.networkStatusMessage}>
            {isConnected ? 'Online' : 'Offline'}
          </p>
          <h1>React.js News</h1>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(newsQuery),
)(Home);
