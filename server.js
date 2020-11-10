const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const { schema, root } = require('./api/utils/schema');
const client = require('./api/utils/bdd');
require('./api/utils/passport');

//GRAPHQL CONNECTION
client.connect();
const server = new ApolloServer({
	typeDefs: gql`
		${schema}
	`,
	resolvers: root,
});

const app = express();
server.applyMiddleware({ app });

//FACEBOOK PASSPORT
app.use(passport.initialize());
app.use(cookieParser());

app.get('/login', passport.authenticate('facebook'));
app.get(
	'/login/callback',
	passport.authenticate('facebook', { failureRedirect: '/login' }),
	(req, res) => {
		res.cookie('jwt', req.user.token, {
			maxAge: 900000,
			httpOnly: true,
		});
		res.redirect('http://localhost:3000');
	}
);

app.listen({ port: 4000 }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
