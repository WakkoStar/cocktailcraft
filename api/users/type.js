const { getUserInfo } = require('./query');
const { deleteUser, reportUser, banUser } = require('./mutation');
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
        cocktail_created_in_day: Int,
        cocktail_crafted_count: Int
    }
`;

module.exports.resolvers = {
	user: getUserInfo,
	deleteUser,
	reportUser,
	banUser,
};
