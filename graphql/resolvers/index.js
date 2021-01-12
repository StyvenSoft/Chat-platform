const userResolvers = require('./users');
const messageResolvers = require('./messages');

module.exports = {
    Query: {
        ...userResolvers.Query,
        ...messageResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...messageResolvers.Mutation,
    }
}