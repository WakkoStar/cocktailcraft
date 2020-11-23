const { getUserInfo, deleteUser } = require('./query');

module.exports.schema = `
    type User {
        id: Int
        username: String
        experience: Int
        rank_id: Int
        rank_name: String
        level_progression: Int
        cocktail_created_count: Int,
        note_count : Int, 
        cocktail_crafted_count: Int
    }
`;

module.exports.resolvers = {
	user: getUserInfo,
	deleteUser,
};
