const { SchemaDirectiveVisitor } = require('apollo-server');

export const schema = `
  directive @rest(url: String) on FIELD_DEFINITION
`;

class RestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { url } = this.args;
    field.resolve = () => fetch(url);
  }
}

export const schemaDirectives = {
  rest: RestDirective,
};
