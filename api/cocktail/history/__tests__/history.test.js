const {
	addCocktailToHistory,
	updateHistory,
	getHistory: getHistoryInDb,
} = require('../data');
const {
	updateCocktailCrafted,
	getUser,
	updateUserExp,
} = require('../../../users/data');
const { getCreatedCocktailByUser, getAllCocktails } = require('../../data');
const { getHistory } = require('../query');
const { addToHistory } = require('../mutation');

let ctx = { user: { is_admin: true, id: 0 } };

const user = {
	id: 0,
	username: 'Hugo',
	cocktail_created_in_day: -990,
	is_admin: true,
	provider_id: 2827765287470350,
	experience: 200,
	provider_name: 'facebook',
	report_count: 0,
	has_ban: false,
	cocktail_crafted_count: 25,
};

const cocktails = [
	{
		cocktail_id: '18',
		nom: 'Mojito',
		gout_array: ['19', '1'],
		difficulty: 'Moyen',
		user_id: '0',
		username: 'Hugo',
		image: 'Mojito.jpg',
	},
	{
		cocktail_id: '19',
		nom: 'Bellini',
		gout_array: ['18', '2'],
		difficulty: 'Facile',
		user_id: '0',
		username: 'Hugo',
		image: 'Bellini.jpg',
		isExist: true,
	},
];

const allCocktails = [
	{
		id: '18',
		nom: 'Mojito',
		gout_array: ['19', '1'],
		difficulty: 'Moyen',
		user_id: '0',
		username: 'Hugo',
		image: 'Mojito.jpg',
		isExist: true,
	},
	{
		id: '19',
		nom: 'Bellini',
		gout_array: ['18', '2'],
		difficulty: 'Facile',
		user_id: '0',
		username: 'Hugo',
		image: 'Bellini.jpg',
		isExist: true,
	},
	{
		id: '20',
		nom: 'test',
		gout_array: ['18', '2'],
		difficulty: 'Facile',
		user_id: '0',
		username: 'Hugo',
		image: 'Bellini.jpg',
		isExist: true,
	},
	{
		id: '21',
		nom: 'test2',
		gout_array: ['18', '2'],
		difficulty: 'Facile',
		user_id: '0',
		username: 'Hugo',
		image: 'Bellini.jpg',
		isExist: true,
	},
];

jest.mock('../data');
jest.mock('../../../users/data');
jest.mock('../../data');

getHistoryInDb.mockResolvedValue(cocktails);
getAllCocktails.mockResolvedValue(allCocktails);
addCocktailToHistory.mockResolvedValue(null);
updateHistory.mockResolvedValue(null);
getUser.mockResolvedValue(user);
getCreatedCocktailByUser.mockResolvedValue(cocktails);

describe('history - queries', () => {
	it('should get history', async () => {
		expect.assertions(1);
		const res = await getHistory(null, {}, ctx);
		expect(res[1].nom).toBe('Bellini');
	});
});

describe('history - mutations', () => {
	it('should add cocktail to history', async () => {
		expect.assertions(2);
		const res = await addToHistory(null, { cocktail_id: 20 }, ctx);
		expect(addCocktailToHistory).toHaveBeenCalled();
		expect(updateHistory).not.toHaveBeenCalled();
		addCocktailToHistory.mockClear();
		updateHistory.mockClear();
	});

	it('should not update history, cocktail not found', async () => {
		expect.assertions(1);
		try {
			await addToHistory(null, { cocktail_id: 25 }, ctx);
		} catch (e) {
			expect(e).toBe('Cocktail not found');
		}
	});

	it('should update cocktail to history', async () => {
		expect.assertions(2);
		const res = await addToHistory(null, { cocktail_id: 18 }, ctx);
		expect(addCocktailToHistory).not.toHaveBeenCalled();
		expect(updateHistory).toHaveBeenCalled();
		addCocktailToHistory.mockClear();
		updateHistory.mockClear();
	});

	it('should update because history length is too big', async () => {
		let arrayPrototype = [];
		for (let index = 0; index < 19; index++) {
			arrayPrototype.push({ cocktail_id: 21 });
		}
		getHistoryInDb.mockResolvedValue([...cocktails, ...arrayPrototype]);
		expect.assertions(2);
		const res = await addToHistory(null, { cocktail_id: 20 }, ctx);
		expect(addCocktailToHistory).not.toHaveBeenCalled();
		expect(updateHistory).toHaveBeenCalled();
		addCocktailToHistory.mockClear();
		updateHistory.mockClear();
	});
});
