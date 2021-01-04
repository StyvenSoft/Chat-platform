const { gql } = require("apollo-server");

module.exports = gql`
    type User {
        username: String!
        email: String!
    }
    type Query {
    "A simple type for getting started!"
    getUsers: [User]! 
    }
`;