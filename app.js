const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const { executableSchema } = require('./graphql');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlExpress({ schema: executableSchema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(8020, () => console.log('API ready'));
