const { addNotifications, deleteNotifications } = require('./mutation');
const { getNotifications } = require('./query');

module.exports.schema = `
    type Notifications {
        message: String
        time: String
        id: Int
    }
`;

module.exports.resolvers = {
	addNotifications,
	deleteNotifications,
	notifications: getNotifications,
};
