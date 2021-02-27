require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const moment = require('moment');
const { schema, root } = require('./api/utils/schema');
const client = require('./api/utils/bdd');
const { isLogged, register } = require('./api/auth/account');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/assets', express.static('assets'));

const corsOptions = {
	// origin: 'http://localhost:4001',
	// credentials: true,
	origin: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue: false,

	optionsSuccessStatus: 204,
};

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

client.connect();
const server = new ApolloServer({
	typeDefs: gql`
		${schema}
	`,
	resolvers: root,
	context: async ({ req }) => ({
		user: await isLogged(req) /* { id: 0, is_admin: true }*/,
	}),
});
server.applyMiddleware({ app, cors: corsOptions });

app.listen({ port: process.env.PORT }, () =>
	console.log(
		`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
	)
);

cron.schedule('5 8 * * 0', function () {
	const text = 'DELETE FROM notifications WHERE time < $1';
	const values = [moment().subtract(7, 'days').format()];
	console.log('old notifications reset');
	client.query(text, values, err => {
		if (err) throw err;
	});
});

cron.schedule('0 0 0 * * *', () => {
	const text = 'UPDATE users SET cocktail_created_in_day = 0';
	console.log('cocktail created in day reset');
	client.query(text, (err, res) => {
		if (err) throw err;
	});
});
