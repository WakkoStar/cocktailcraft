require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { schema, root } = require('./api/utils/schema');
const client = require('./api/utils/bdd');
const isLogged = require('./api/utils/auth');
require('./api/utils/passport');

const app = express();

//CORS
const corsOptions = {
	origin: process.env.CLIENT_URL,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue: false,
	optionsSuccessStatus: 204,
	credentials: true,
};
//GRAPHQL CONNECTION
client.connect();
const server = new ApolloServer({
	typeDefs: gql`
		${schema}
	`,
	resolvers: root,
	context: async ({ req }) => ({
		user: await isLogged(req),
	}),
});
server.applyMiddleware({ app, cors: corsOptions });

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
		res.redirect(process.env.CLIENT_URL);
	}
);

app.listen({ port: process.env.PORT }, () =>
	console.log(
		`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
	)
);
