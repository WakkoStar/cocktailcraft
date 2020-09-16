
const { ApolloServer, gql} = require('apollo-server');
const {schema, root} = require("./api/utils/schema")
const client = require('./api/utils/bdd')


client.connect()
const server = new ApolloServer({ typeDefs: gql`${schema}`, resolvers: root });


server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

/*
//const cors = require('cors')
//const path = require('path');
//var express = require('express');
//var graphqlHTTP = require('express-graphql');
var app = express();
app.use(cors())
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql:true
}));
// //react
// app.use(express.static(path.join(__dirname, 'public')));
// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
*/