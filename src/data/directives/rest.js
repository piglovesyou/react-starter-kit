import fetch from 'node-fetch';

const { SchemaDirectiveVisitor } = require('apollo-server');

export const schema = `
  directive @rest(url: String) on FIELD_DEFINITION
`;

class RestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { url } = this.args;
    field.resolve = () => fetch(url).then(res => res.json());
  }
}

export const schemaDirectives = {
  rest: RestDirective,
};
