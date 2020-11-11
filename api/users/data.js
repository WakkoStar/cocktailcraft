const client = require('../utils/bdd');

module.exports.getUser = async id => {
	const text = 'SELECT * FROM users WHERE facebook_id = $1';
	const values = [id];
	const res = await client.query(text, values);
	return res.rows[0];
};

module.exports.getUserInfo = async id => {
	const text = 'SELECT * FROM users WHERE facebook_id = $1';
	const values = [id];
	const res = await client.query(text, values);
	return res.rows;
};

module.exports.createUser = (username, facebook_id) => {
	const text =
		'INSERT INTO users (username, cocktail_created_in_day, is_admin, facebook_id) VALUES ($1, $2, $3, $4)';
	const values = [username, 0, false, facebook_id];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};

module.exports.updateCocktailCreatedInDay = (cocktail_created_in_day, id) => {
	const text = 'UPDATE users SET cocktail_created_in_day = $1 WHERE id = $2';
	const values = [cocktail_created_in_day, id];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};

module.exports.deleteUser = ({ id }) => {
	const text = 'DELETE FROM users WHERE id = $1';
	const values = [id];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};
