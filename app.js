const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const authRouter = require('./auth');
const graphqlRouter = require('./graphql');

const app = express();

app.use(bodyParser.json());

app.use(authRouter);
app.use(graphqlRouter);

app.listen(8020, () => console.log('API ready'));
