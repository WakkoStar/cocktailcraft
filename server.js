const { ApolloServer, gql } = require('apollo-server');
const { schema, root } = require('./api/utils/schema');
const client = require('./api/utils/bdd');

client.connect();
const server = new ApolloServer({
	typeDefs: gql`
		${schema}
	`,
	resolvers: root,
});

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
