const {
	deleteUser: deleteUserInDb,
	getUser: getUserInDb,
	reportUser: reportUserInDb,
	banUser: banUserInDb,
} = require('./data');

module.exports.deleteUser = async (_, {}, ctx) => {
	return new Promise(async (resolve, reject) => {
		const user = await getUserInDb(ctx.user.id);
		if (user !== undefined) {
			deleteUserInDb({ id: user.id });
			resolve(
				`L'utilisateur vient d'être supprimé avec succès (utilisateur: ${user.username})`
			);
		} else {
			reject('User not found');
		}
	});
};

module.exports.reportUser = async (_, { user_id }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (ctx.user.is_admin == false) {
			reject('Not Admin');
			return;
		}
		const user = await getUserInDb(user_id);
		if (user) {
			reportUserInDb(user_id, user.report_count + 1);
			user.report_count === 2 && banUserInDb(user_id);
			resolve(
				`L'utilisateur a été reporté avec succès (utilisateur :${user.username})`
			);
		} else {
			reject('User not found');
		}
	});
};

module.exports.banUser = async (_, { user_id }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (ctx.user.is_admin === false) {
			reject('Not Admin');
			return;
		}
		const user = await getUserInDb(user_id);
		if (user !== undefined) {
			banUserInDb(user_id);
			resolve(
				`L'utilisateur a été banni avec succès (utilisateur :${user.username})`
			);
		} else {
			reject('User not founded');
		}
	});
};
