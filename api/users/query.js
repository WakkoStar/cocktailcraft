const {
	getUserInfo: getUserInDb,
	deleteUser: deleteUserInDb,
} = require('./data');

module.exports.getUserInfo = async (_, { id }) => {
	const user = await getUserInDb(id);
	return user;
};

module.exports.deleteUser = async (_, { id }) => {
	const user = await getUserInfo(id);
	if (user) {
		await deleteUserInDb(id);
		return `"L'utilisateur vient d'être supprimé avec succès" (utilisateur: ${user.username})`;
	} else {
		throw new Error('User not founded');
	}
};
