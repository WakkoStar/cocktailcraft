require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { schema, root } = require('./api/utils/schema');
const client = require('./api/utils/bdd');
const { isLogged, register } = require('./api/auth/account');
require('./api/auth/passport');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//CORS
const corsOptions = {
	origin: [process.env.CLIENT_URL, '192.168.1.11'],
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue: false,
	optionsSuccessStatus: 204,
	credentials: true,
};

//LOGIN ON MOBILE
app.post('/register', async (req, res) => {
	const profile = req.body.user;
	register(profile)
		.then(() => {
			res.json({ status: 'connected' });
		})
		.catch(() => {
			res.status(401).send({ status: 'banned' });
		});
});

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

app.get('/fb/login', passport.authenticate('facebook'));
app.get(
	'/fb/login/callback',
	passport.authenticate('facebook', { failureRedirect: '/fb/login' }),
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
