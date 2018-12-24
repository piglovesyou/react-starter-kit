// @flow

import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { BatchHttpLink } from 'apollo-link-batch-http';
import apolloLogger from 'apollo-link-logger';
import { withClientState } from 'apollo-link-state';
import createCache from './createCache';
import { resolvers as clientSideResolvers } from '../../state';

export default function createApolloClient() {
  const cache = createCache();

  const stateLink = withClientState({
    cache,
    defaults: window.App.initialState,
    resolvers: clientSideResolvers,
  });

  const link = from([
    // batchLink,
    stateLink,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.warn(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.warn(`[Network error]: ${networkError}`);
    }),
    ...(__DEV__ ? [apolloLogger] : []),
    new BatchHttpLink({
      uri: '/graphql',
      credentials: 'include',
      batchInterval: 1000,
    }),
  ]);

  return new ApolloClient({
    link,
    cache: cache.restore(window.App.cache),
    queryDeduplication: true,
    connectToDevTools: true,
  });
}
