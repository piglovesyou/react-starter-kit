import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import fetch from 'node-fetch';
import { inspect } from 'util';

// レスポンスに対して何かする例
const link1 = new ApolloLink((operation, forward) =>
  // GraphQLクエリを使って何かする
  // 他のlinkで使うデータをContextに載せる
  forward(operation).map(data =>
    // レスポンスに対して何かする
    ({ ...data, additional: '追加の値' }),
  ),
);

// 加えてエラーに対して何かする例
const link2 = new ApolloLink(
  (operation, forward) =>
    // GraphQLクエリを使って何かする
    // 他のlinkで使うデータをContextに載せる
    new Observable(observer =>
      forward(operation).subscribe(
        data => {
          // レスポンスに対して何かする
          observer.next({ ...data, additional: '追加の値' });
        },
        error => {
          // GraphQLエラーに対して何かする
          observer.error(error);
        },
        (...args) => {
          // Finally
        },
      ),
    ),
);

const url = 'http://localhost:3000/graphql';

// HTTPリクエストでJSONを取得、Apollo Linkチェーンを折り返す例
const httpLink = new ApolloLink(
  operation =>
    new Observable(observer => {
      const key = operation.toKey();
      const query = key.slice(0, key.length - '|{}|null'.length);
      fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          operationName: operation.operationName,
          variables: operation.variables,
          query,
        }),
      })
        .then(res => res.json())
        .then(json => observer.next(json))
        .catch(json => observer.error(json))
        .finally(() => observer.complete());
    }),
);

const cache = new InMemoryCache();

// Apollo Linkチェーンの例
const client = new ApolloClient({
  link: ApolloLink.from([link1, link2, httpLink]),
  cache,
});

client
  .query({
    query: gql`
      query {
        reactjsGetAllNews {
          title
        }
      }
    `,
  })
  .then(console.log)
  .catch(e => inspect(e, true, 1000));
