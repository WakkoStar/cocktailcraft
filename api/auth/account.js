require('dotenv').config();

const { AuthenticationError } = require('apollo-server-express');
const getFacebookUser = require('./facebookUser');
const { getUserByProviderId, createUser } = require('../users/data');

//TODO :GOOGLE
const isLogged = async req => {
	let token;
	//PC, TODO : to delete
	if (req.headers.cookie) {
		token = req.headers.cookie.replace('jwt=', '');
		//MOBILE
	} else if (req.headers.authorization) {
		token = req.headers.authorization.replace('Bearer ', '');
	}

	user = await getFacebookUser(token);

	if (!user) throw new AuthenticationError('You must be logged in');
	if (user.has_ban)
		throw new AuthenticationError('You can not use this account');
	return user;
};

//TODO : GOOGLE
const register = async profile => {
	const user = await getUserByProviderId(profile.id, profile.provider);
	if (user.has_ban)
		throw new AuthenticationError('You can not use this account');
	if (!user) {
		createUser(profile.first_name, profile.id, profile.provider);
	}
};

module.exports.isLogged = isLogged;
module.exports.register = register;
