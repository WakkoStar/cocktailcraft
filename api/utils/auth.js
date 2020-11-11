require('dotenv').config();
const fetch = require('node-fetch');
const { getUser } = require('../users/data');
const { AuthenticationError } = require('apollo-server-express');
const isLogged = async req => {
	const token = req.headers.cookie && req.headers.cookie.replace('jwt=', '');
	const data = await fetch(
		`https://graph.facebook.com/debug_token?input_token=${token}&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`
	);
	const res = await data.json();
	user = await getUser(res.data.user_id);
	if (!user) throw new AuthenticationError('you must be logged in');
	return user;
};
module.exports = isLogged;
