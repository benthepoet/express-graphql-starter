const { makeExecutableSchema } = require('graphql-tools');

const resolvers = require('./resolvers');
const typeDefs = require('./typedefs');

const executableSchema = makeExecutableSchema({
    resolvers,
    typeDefs
});

module.exports = {
    executableSchema
};
