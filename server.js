const { ApolloServer } = require('apollo-server');
// The GraphQL schema
const typeDefs = require('./graphql/typeDefs');
// A map of functions which return data for the schema.
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});