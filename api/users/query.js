const {
	getUser: getUserInDb,
	getAllLevels,
	getCreatedCocktailCountByUserId,
	getNotesCountByUserId,
} = require('./data');

module.exports.getUserInfo = async (_, {}, ctx) => {
	const user = await getUserInDb(ctx.user.id);
	//GET RANK
	const levels = await getAllLevels();
	const nextLevelIndex = levels.findIndex(
		level => parseInt(level.experience) > parseInt(user.experience)
	);
	const currentLevel = levels[nextLevelIndex - 1];
	const nextLevel = levels[nextLevelIndex];
	//GET LEVEL PROGRESSION
	const levelProgressionRate =
		(user.experience - currentLevel.experience) /
		(nextLevel.experience - currentLevel.experience);

	//GET COCKTAIL CREATED COUNT
	const cocktailCreatedCount = await getCreatedCocktailCountByUserId(
		ctx.user.id
	);
	//GET NOTES COUNT
	const noteCount = await getNotesCountByUserId(ctx.user.id);
	return {
		...user,
		rank_id: currentLevel.id,
		rank_name: currentLevel.rank,
		note_count: noteCount,
		level_progression: Math.floor(levelProgressionRate * 100),
		cocktail_created_count: cocktailCreatedCount,
	};
};
