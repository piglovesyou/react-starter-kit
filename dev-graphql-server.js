/* eslint-disable */

// ./dev-graphql-server.js
import { ApolloServer } from 'apollo-server';

global.__DEV__ = true;
const { default: schema } = require('./src/data/schema');

new ApolloServer(schema).listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
