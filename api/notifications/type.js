const { addNotifications, deleteNotifications } = require('./mutation');
const { getNotifications } = require('./query');

module.exports.schema = `
    type Notifications {
        message: Float
        id: Int
    }
`;

module.exports.resolvers = {
	addNotifications,
	deleteNotifications,
	notifications: getNotifications,
};
