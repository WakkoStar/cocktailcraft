const { AuthenticationError } = require('apollo-server-express');
const getGoogleUser = require('./googleUser');
const { getUserByProviderId, createUser } = require('../users/data');

const isLogged = async req => {
	let token;
	if (req.headers.authorization) {
		token = req.headers.authorization.replace('Bearer ', '');
	}
	if (token == undefined) {
		throw new AuthenticationError('You must be logged in');
	}

	let user = await getGoogleUser(token);
	if (!user) throw new AuthenticationError('You must be logged in');
	if (user.has_ban)
		throw new AuthenticationError('You can not use this account');
	return user;
};

const register = async profile => {
	const user = await getUserByProviderId(profile.id, profile.provider);
	if (user && user.has_ban)
		throw new AuthenticationError('You can not use this account');
	if (!user) {
		createUser(profile.first_name, profile.id, profile.provider);
	}
};

module.exports.isLogged = isLogged;
module.exports.register = register;
