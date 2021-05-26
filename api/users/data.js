const client = require('../utils/bdd');

module.exports.getUserByProviderId = async (pid, provider_name) => {
	const text =
		'SELECT * FROM users WHERE provider_id = $1 AND provider_name= $2';
	const values = [pid, provider_name];
	const res = await client.query(text, values);
	return res.rows[0] ? res.rows[0] : undefined;
};

module.exports.getUser = async id => {
	const text = 'SELECT * FROM users WHERE id = $1';
	const values = [id];
	const res = await client.query(text, values);
	return res.rows[0] ? res.rows[0] : undefined;
};

module.exports.createUser = (username, provider_id, provider_name) => {
	const text =
		'INSERT INTO users (username, provider_id,provider_name ) VALUES ($1, $2, $3)';
	const values = [username, provider_id, provider_name];

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
module.exports.updateCocktailCrafted = (cocktail_count, id) => {
	const text = 'UPDATE users SET cocktail_crafted_count = $1 WHERE id = $2';
	const values = [cocktail_count, id];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};

module.exports.updateUserExp = (experience, id) => {
	const text = 'UPDATE users SET experience = $1 WHERE id = $2';
	const values = [experience, id];

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

//USER INFO
module.exports.getAllLevels = async () => {
	const text = 'SELECT * FROM levels ORDER BY id';
	const res = await client.query(text);
	return res.rows;
};

module.exports.getCreatedCocktailCountByUserId = async user_id => {
	const text = 'SELECT * FROM cocktails WHERE user_id = $1';
	const values = [user_id];
	const res = await client.query(text, values);
	return res.rowCount;
};
module.exports.getNotesCountByUserId = async user_id => {
	const text = 'SELECT * FROM notes WHERE user_id= $1';
	const values = [user_id];
	const res = await client.query(text, values);
	return res.rowCount;
};

module.exports.reportUser = async (user_id, rate) => {
	const text = 'UPDATE users SET report_count = $1 WHERE id = $2';
	const values = [rate, user_id];
	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};

module.exports.banUser = async user_id => {
	const text = 'UPDATE users SET has_ban = true WHERE id = $1';
	const values = [user_id];
	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};
