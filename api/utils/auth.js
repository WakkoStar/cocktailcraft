require('dotenv').config();
const fetch = require('node-fetch');
const { AuthenticationError } = require('apollo-server-express');

const { getUser, createUser } = require('../users/data');

const isLogged = async req => {
	let token;
	if (req.headers.cookie) {
		token = req.headers.cookie.replace('jwt=', '');
	} else if (req.headers.authorization) {
		token = req.headers.authorization.replace('Bearer ', '');
	}

	const data = await fetch(
		`https://graph.facebook.com/debug_token?input_token=${token}&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`
	);
	const res = await data.json();
	user = await getUser(res.data.user_id);
	if (!user) throw new AuthenticationError('you must be logged in');
	return user;
};

const register = async profile => {
	const user = await getUser(profile.id);
	if (!user) {
		createUser(profile.first_name, profile.id);
	}
};

module.exports.isLogged = isLogged;
module.exports.register = register;
