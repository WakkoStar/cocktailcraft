const {
	addLovedCocktail: addLovedCocktailInDb,
	deleteLovedCocktail: deleteLovedCocktailInDb,
	getCocktailsLovedByUserId,
} = require('../data');
const { getHelpersCocktails } = require('../../../utils/finder');
const { getCocktailsLoved } = require('../query');
const { deleteLovedCocktail, addLovedCocktail } = require('../mutation');
const { mockLoved, mockCtx } = require('../../../mocks/data');

let ctx = mockCtx;
jest.mock('../data');
getCocktailsLovedByUserId.mockResolvedValue(mockLoved);

describe('loved cocktails - queries', () => {
	it('should get loved cocktails', async () => {
		expect.assertions(1);
		const res = await getCocktailsLoved(null, {}, ctx);
		expect(res[0].id).toBe('18');
	});
});

describe('loved cocktails - mutations', () => {
	it('should add loved cocktails', async () => {});
});
