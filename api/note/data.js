const client = require('../utils/bdd');

module.exports.getAllNotesByCocktailId = async cocktail_id => {
	const text = 'SELECT * FROM notes WHERE cocktail_id = $1';
	const values = [cocktail_id];
	const res = await client.query(text, values);
	return res.rows;
};

module.exports.addNote = (user_id, cocktail_id, rate) => {
	const text =
		'INSERT INTO notes (user_id, cocktail_id, rate) VALUES ($1, $2, $3)';
	const values = [user_id, cocktail_id, rate];

	client.query(text, values, err => {
		if (err) throw err;
	});
};

module.exports.updateNote = (user_id, cocktail_id, rate) => {
	const text =
		'UPDATE notes SET rate = $1 WHERE user_id = $2 AND cocktail_id = $3';
	const values = [rate, user_id, cocktail_id];

	client.query(text, values, err => {
		if (err) throw err;
	});
};
