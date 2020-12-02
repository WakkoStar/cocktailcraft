const client = require('../utils/bdd');

module.exports.getAllNotificationsByUserId = async user_id => {
	const res = await client.query(
		'SELECT * FROM notifications WHERE user_id = $1 ORDER BY time DESC',
		[user_id]
	);

	return res.rows;
};

module.exports.addNotifications = ({ message, user_id }) => {
	const text = 'INSERT INTO gouts (message, user_id) VALUES ($1, $2)';
	const values = [message, user_id];

	client.query(text, values, err => {
		if (err) throw err;
	});
};

module.exports.deleteNotifications = ({ id }) => {
	const text = 'DELETE FROM notifications WHERE id = $1';
	const values = [id];

	client.query(text, values, err => {
		if (err) throw err;
	});
};
