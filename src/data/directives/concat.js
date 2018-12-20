/* eslint-disable */

import fetch from 'node-fetch';

const { SchemaDirectiveVisitor } = require('apollo-server');

export const schema = `
  directive @concat(urls: [String]) on FIELD_DEFINITION
`;

class ConcatDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(fieldDefinition) {
    const { urls } = this.args;
    fieldDefinition.resolve = (obj, args, context, info) =>
      Promise.all(urls.map(url => fetch(url).then(res => res.json()))).then(
        rs => rs.reduce((xs, arr) => [...xs, ...arr], []),
      );
  }
}

export const schemaDirectives = {
  concat: ConcatDirective,
};
