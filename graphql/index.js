const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { Router } = require('express');

const resolvers = require('./resolvers');
const typeDefs = require('./typedefs');

const executableSchema = makeExecutableSchema({
    resolvers,
    typeDefs
});

const router = Router();

router.use('/graphql', graphqlExpress({ schema: executableSchema }));
router.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

module.exports = router;
