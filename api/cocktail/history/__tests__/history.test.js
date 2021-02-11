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
const { getCreatedCocktailsByUser } = require('../../data');
const { getHistory } = require('../query');
const { addToHistory } = require('../mutation');
const { getHelpersCocktails } = require('../../../utils/finder');
const {
	mockUser,
	mockCtx,
	mockCocktail,
	mockHistory,
	mockCocktails,
} = require('../../../mocks/data');
let ctx = mockCtx;

jest.mock('../data');
jest.mock('../../../users/data');
jest.mock('../../data');
jest.mock('../../../utils/finder');

getHistoryInDb.mockResolvedValue(mockHistory);
getHelpersCocktails.mockResolvedValue(mockCocktail);
addCocktailToHistory.mockResolvedValue(null);
updateHistory.mockResolvedValue(null);
getUser.mockResolvedValue(mockUser);
getCreatedCocktailsByUser.mockResolvedValue(mockCocktails);

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
		getHelpersCocktails.mockResolvedValue({
			...mockCocktail,
			isExist: false,
		});
		expect.assertions(1);
		try {
			await addToHistory(null, { cocktail_id: '25' }, ctx);
		} catch (e) {
			expect(e).toBe('Cocktail not found');
		}
	});

	it('should update cocktail to history', async () => {
		getHelpersCocktails.mockResolvedValue(mockCocktail);
		expect.assertions(2);
		const res = await addToHistory(null, { cocktail_id: '18' }, ctx);
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
		getHistoryInDb.mockResolvedValue([...mockHistory, ...arrayPrototype]);
		expect.assertions(2);
		const res = await addToHistory(null, { cocktail_id: '20' }, ctx);
		expect(addCocktailToHistory).not.toHaveBeenCalled();
		expect(updateHistory).toHaveBeenCalled();
		addCocktailToHistory.mockClear();
		updateHistory.mockClear();
	});
});
