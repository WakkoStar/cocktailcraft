const {
	createDescriptionsOfCocktail,
	createIngredientOfCocktail,
	updateDescriptionOfCocktail,
	updateIngredientOfCocktail,
	deleteIngredientOfCocktail: deleteIngredientOfCocktailInDb,
	deleteDescriptionOfCocktail: deleteDescriptionOfCocktailInDb,
} = require('../data');
const {
	getHelpersCocktails,
	getHelpersIngredient,
} = require('../../../utils/finder');

const {
	isValidPreparation,
	isValidDescription,
	isValidVolume,
} = require('../../helpers');

const {
	createDescriptionCocktail,
	createIngredientCocktail,
	modifyDescriptionCocktail,
	modifyIngredientCocktail,
	deleteIngredientCocktail,
	deleteDescriptionCocktail,
} = require('../mutation');

const {
	mockDevCocktail,
	mockCocktail,
	mockCtx,
	mockIngredient,
} = require('../../../mocks/data');

jest.mock('../data');
jest.mock('../../../utils/finder');

let ctx = mockCtx;
const cocktailDev = mockDevCocktail;
const cocktail = mockCocktail;
createDescriptionsOfCocktail.mockResolvedValue(null);
updateDescriptionOfCocktail.mockResolvedValue(null);
deleteDescriptionOfCocktailInDb.mockResolvedValue(null);

const inputDesc = {
	content: 'teeeeeeeeeeeeeest',
	preparation: 'Directement dans le verre',
	id_cocktail: 0,
};

const inputIngr = {
	ingredient_id: 0,
	volume: '3 cL',
	id_cocktail: 0,
};

getHelpersIngredient.mockResolvedValue(mockIngredient);

describe('Element cocktail - mutations', () => {
	it('should create description of the cocktail', async () => {
		getHelpersCocktails.mockResolvedValue(cocktailDev);
		expect.assertions(2);
		const res = await createDescriptionCocktail(
			null,
			{ input: inputDesc },
			ctx
		);
		expect(createDescriptionsOfCocktail).toHaveBeenCalled();
		expect(res).toBe('Description created');
	});

	it('should not create description because cocktail is visible and not admin', async () => {
		ctx.user.is_admin = false;
		getHelpersCocktails.mockResolvedValue(cocktail);
		expect.assertions(1);
		try {
			await createDescriptionCocktail(null, { input: inputDesc }, ctx);
		} catch (e) {
			expect(e).toBe(`Can't create description`);
		}
	});

	it('should not create description because cocktail is not mine and not admin', async () => {
		ctx.user.id = 31;
		getHelpersCocktails.mockResolvedValue(cocktailDev);
		expect.assertions(1);
		try {
			await createDescriptionCocktail(null, { input: inputDesc }, ctx);
		} catch (e) {
			expect(e).toBe(`Can't create description`);
		}
	});

	it('should modify description', async () => {
		getHelpersCocktails.mockResolvedValue(cocktailDev);
		ctx.user.is_admin = true;
		ctx.user.id = 0;
		expect.assertions(2);
		const res = await modifyDescriptionCocktail(
			null,
			{ input: inputDesc },
			ctx
		);
		expect(updateDescriptionOfCocktail).toHaveBeenCalled();
		expect(res).toBe('Description modified');
	});

	it('should not modify description because its not admin', async () => {
		getHelpersCocktails.mockResolvedValue(cocktailDev);
		ctx.user.is_admin = false;
		expect.assertions(1);
		try {
			await modifyDescriptionCocktail(null, { input: inputDesc }, ctx);
		} catch (e) {
			expect(e).toBe(`Cant modify this description`);
		}
	});

	it('should not modify description because one param is undefined', async () => {
		getHelpersCocktails.mockResolvedValue(cocktailDev);
		ctx.user.is_admin = true;
		expect.assertions(1);
		try {
			await modifyDescriptionCocktail(
				null,
				{ input: { ...inputDesc, preparation: undefined } },
				ctx
			);
		} catch (e) {
			expect(e).toBe(`Cant modify this description`);
		}
	});

	it('should delete description', async () => {
		getHelpersCocktails.mockResolvedValue(cocktailDev);
		expect.assertions(2);
		const res = await deleteDescriptionCocktail(
			null,
			{ input: inputDesc },
			ctx
		);
		expect(res).toBe('Description deleted');
		expect(deleteDescriptionOfCocktailInDb).toHaveBeenCalled();
	});

	it('should create ingredient of the cocktail', async () => {
		getHelpersCocktails.mockResolvedValue(cocktailDev);
		expect.assertions(2);
		const res = await createIngredientCocktail(
			null,
			{ input: inputIngr },
			ctx
		);
		expect(createIngredientOfCocktail).toHaveBeenCalled();
		expect(res).toBe('Ingredient created');
	});

	it('should modify ingredient of the cocktail', async () => {
		getHelpersCocktails.mockResolvedValue(cocktailDev);
		expect.assertions(2);
		const res = await modifyIngredientCocktail(
			null,
			{ input: inputIngr },
			ctx
		);
		expect(updateIngredientOfCocktail).toHaveBeenCalled();
		expect(res).toBe('Ingredient modified');
	});

	it('should not modify ingredient of the cocktail because its not admin', async () => {
		ctx.user.is_admin = false;
		getHelpersCocktails.mockResolvedValue(cocktailDev);
		expect.assertions(1);
		try {
			await modifyIngredientCocktail(null, { input: inputIngr }, ctx);
		} catch (e) {
			expect(e).toBe(`Cant modify this ingredient`);
		}
	});

	it('should not delete ingredient of the cocktail because its not admin', async () => {
		getHelpersCocktails.mockResolvedValue(cocktailDev);
		expect.assertions(1);
		try {
			await deleteIngredientCocktail(null, { input: inputIngr }, ctx);
		} catch (e) {
			expect(e).toBe(`Cant delete this ingredient`);
		}
	});

	it('should delete ingredient of the cocktail', async () => {
		ctx.user.is_admin = true;
		getHelpersCocktails.mockResolvedValue(cocktailDev);
		expect.assertions(2);
		const res = await deleteIngredientCocktail(
			null,
			{ input: inputIngr },
			ctx
		);
		expect(deleteIngredientOfCocktailInDb).toHaveBeenCalled();
		expect(res).toBe('Ingredient deleted');
	});
});
