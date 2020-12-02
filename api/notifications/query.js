const { getAllNotificationsByUserId } = require('./data');

module.exports.getNotifications = async (_, {}, ctx) => {
	const notifications = await getAllNotificationsByUserId(ctx.user.id);
	return notifications;
};
