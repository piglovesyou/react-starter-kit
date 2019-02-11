import merge from 'lodash.merge';

import {
  resolvers as NetworkStateResolvers,
  defaults as NetworkStateDefaults,
  schema as NetworkStateSchema,
  queries as NetworkStateQuery,
  mutations as NetworkStateMutation,
} from './networkState';

// Below are used for apollo-link-state and not used in GraphQL server.
export const defaults = merge(NetworkStateDefaults);
export const resolvers = merge(NetworkStateResolvers);

// Below are used for GraphQL introspection that generates Flow types by apollo:codegen.
// These are not used in runtime.
export const schema = merge(NetworkStateSchema);
export const queries = merge(NetworkStateQuery);
export const mutations = merge(NetworkStateMutation);
