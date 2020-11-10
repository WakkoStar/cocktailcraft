const isLogged = req => {
	if (!req.user) throw new Error('you must be logged in');
	return req.user;
};
module.exports = isLogged;
