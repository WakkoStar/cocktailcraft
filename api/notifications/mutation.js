const {
	addNotifications: addNotificationsInDb,
	deleteNotifications: deleteNotificationsInDb,
} = require('./data');
const _ = require('lodash');
const { getUser } = require('../users/data');

module.exports.addNotifications = async (_, { message, user_id }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!ctx.user.is_admin) {
			reject('Not admin');
			return;
		}
		if (!message || !user_id) {
			reject('empty fields');
			return;
		}

		const user = await getUser(user_id);
		if (user) {
			addNotificationsInDb({ message, user_id });
			resolve(`Notification ajouté avec succès (user: ${user.username})`);
		} else {
			reject('User not found');
		}
	});
};

module.exports.deleteNotifications = async (_, { id }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!id) {
			reject('empty fields');
			return;
		}

		const user = await getUser(ctx.user.id);
		if (user) {
			deleteNotificationsInDb({ id });
			resolve(
				`Notification supprimé avec succès (user: ${user.username})`
			);
		} else {
			reject('User not found');
		}
	});
};
