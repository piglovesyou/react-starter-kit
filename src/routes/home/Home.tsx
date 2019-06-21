/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import { Container } from 'reactstrap';
import { withHomeNews } from '../../__generated__/dataBinders';
import { useNotif } from '../../components/Notification';
import s from './Home.css';

const Home = withHomeNews<{}>()(props => {
  useStyles(s);
  const { addNotification } = useNotif();

  const {
    loading,
    reactjsGetAllNews,
    networkStatus: { isConnected },
  } = props.data!;

  return (
    <Container>
      <p className={s.networkStatusMessage}>
        <button
          type="button"
          onClick={() =>
            addNotification({
              title: 'My Noitfiaction',
              message: 'Notification from Home.js',
              type: Math.random() < 0.5 ? 'success' : 'danger',
            })
          }
        >
          Notification
        </button>{' '}
        {isConnected ? 'Online' : 'Offline'}
      </p>
      <h1>React.js News</h1>
      {loading || !reactjsGetAllNews
        ? 'Loading...'
        : reactjsGetAllNews.map(item => (
            <article key={item.link} className={s.newsItem}>
              <h1 className={s.newsTitle}>
                <a href={item.link}>{item.title}</a>
              </h1>
              <div
                className={s.newsDesc}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </article>
          ))}
    </Container>
  );
});

export default Home;
