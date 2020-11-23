require('dotenv').config();

const { AuthenticationError } = require('apollo-server-express');
const getFacebookUser = require('./facebookUser');
const { getUserByProviderId, createUser } = require('../users/data');

const isLogged = async req => {
	let token;
	//PC
	if (req.headers.cookie) {
		token = req.headers.cookie.replace('jwt=', '');
		//MOBILE
	} else if (req.headers.authorization) {
		token = req.headers.authorization.replace('Bearer ', '');
	}

	user = await getFacebookUser(token);
	if (!user) throw new AuthenticationError('you must be logged in');

	return user;
};

const register = async profile => {
	const user = await getUserByProviderId(profile.id, profile.provider);
	if (!user) {
		createUser(profile.first_name, profile.id, profile.provider);
	}
};

module.exports.isLogged = isLogged;
module.exports.register = register;
