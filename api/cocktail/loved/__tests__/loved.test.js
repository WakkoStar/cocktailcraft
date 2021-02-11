const {
	addLovedCocktail: addLovedCocktailInDb,
	deleteLovedCocktail: deleteLovedCocktailInDb,
	getCocktailsLovedByUserId,
} = require('../data');
const { getHelpersCocktails } = require('../../../utils/finder');
const { getCocktailsLoved } = require('../query');
const { deleteLovedCocktail, addLovedCocktail } = require('../mutation');
const { mockLoved, mockCtx, mockCocktail } = require('../../../mocks/data');

let ctx = mockCtx;
const cocktail = mockCocktail;

jest.mock('../data');
jest.mock('../../../utils/finder');

getCocktailsLovedByUserId.mockResolvedValue(mockLoved);
getHelpersCocktails.mockResolvedValue(cocktail);
addLovedCocktailInDb.mockResolvedValue(null);
deleteLovedCocktailInDb.mockResolvedValue(null);

describe('loved cocktails - queries', () => {
	it('should get loved cocktails', async () => {
		expect.assertions(1);
		const res = await getCocktailsLoved(null, {}, ctx);
		expect(res[0].id).toBe('18');
	});
});

describe('loved cocktails - mutations', () => {
	it('should add loved cocktails', async () => {
		expect.assertions(2);
		const res = await addLovedCocktail(null, { cocktail_id: 0 }, ctx);
		expect(addLovedCocktailInDb).toHaveBeenCalled();
		expect(res).toBe(
			"Le cocktail vient d'être ajouté avec succès (cocktail enregistré : Mojito)"
		);
	});

	it('should not add loved cocktails because cocktail_id is null', async () => {
		expect.assertions(1);
		try {
			await addLovedCocktail(null, { cocktail_id: null }, ctx);
		} catch (e) {
			expect(e).toBe('empty fields');
		}
	});

	it('should not add loved cocktails because isExist is false', async () => {
		expect.assertions(1);
		getHelpersCocktails.mockResolvedValue({
			...mockCocktail,
			isExist: false,
		});
		try {
			await addLovedCocktail(null, { cocktail_id: 0 }, ctx);
		} catch (e) {
			expect(e).toBe('ID no founded');
		}
	});

	it('should delete loved cocktails', async () => {
		expect.assertions(2);
		getHelpersCocktails.mockResolvedValue(cocktail);
		const res = await deleteLovedCocktail(null, { cocktail_id: 0 }, ctx);
		expect(deleteLovedCocktailInDb).toHaveBeenCalled();
		expect(res).toBe(
			"Le cocktail vient d'être supprimé avec succès (cocktail enregistré : Mojito)"
		);
	});
});
