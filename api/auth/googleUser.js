require('dotenv').config();
var admin = require('firebase-admin');
var serviceAccount = require(process.env.SERVICE_ACCOUNT_PATH);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const { getUserByProviderId } = require('../users/data');

module.exports = async token => {
	return new Promise((resolve, reject) => {
		admin
			.auth()
			.verifyIdToken(token, true)
			.then(async decodedToken => {
				let user = await getUserByProviderId(
					decodedToken.email,
					'google'
				);
				resolve(user);
			})
			.catch(() => {
				reject({ message: 'Error during decoding token' });
			});
	});
};
