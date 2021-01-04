const { ApolloServer, gql } = require('apollo-server');

// The GraphQL schema
const typeDefs = gql`
    type User {
        username: String!
        email: String!
    }
  type Query {
    "A simple type for getting started!"
    getUsers: [User]! 
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    getUsers: () => {
        const users = [
            {
                username: "User1",
                email: "user1@gmail.com"
            },
            {
                username: "User2",
                email: "user2@gmail.com"
            }
        ]
        return users;
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});