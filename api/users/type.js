const { getUserInfo, deleteUser } = require('./query');

module.exports.schema = `
    type User {
        id: Int
        username: String
        avatar: String
        experience: Int
        rank: String
        cocktailCraftedCount: Int,
        noteCount : Int, 
        cocktailCreatedCount: Int
    }
`;

module.exports.resolvers = {
	user: getUserInfo,
	deleteUser,
};
