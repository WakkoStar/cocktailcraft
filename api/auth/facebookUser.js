require('dotenv').config();
const fetch = require('node-fetch');

const { getUserByProviderId } = require('../users/data');

module.exports = async token => {
	const data = await fetch(
		`https://graph.facebook.com/debug_token?input_token=${token}&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`
	);
	const res = await data.json();
	user = await getUserByProviderId(res.data.user_id, 'facebook');

	return user;
};
