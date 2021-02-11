const { getAllCocktails } = require('../../cocktail/data');
const { getAllIngredients } = require('../../ingredient/data');
const { mockCocktails, mockIngredients } = require('../../mocks/data');
const { getHelpersCocktails, getHelpersIngredient } = require('../finder');
jest.mock('../../cocktail/data');
jest.mock('../../ingredient/data');

getAllCocktails.mockResolvedValue(mockCocktails);
getAllIngredients.mockResolvedValue(mockIngredients);

it('should get cocktail with id', async () => {
	expect.assertions(1);
	const res = await getHelpersCocktails('21', [true]);
	expect(res.nom).toBe('test2');
});

it('should get cocktail with name', async () => {
	expect.assertions(1);
	const res = await getHelpersCocktails('28', [true], 'Mojito');
	expect(res.id).toBe('18');
});

it('should not get cocktail with id', async () => {
	expect.assertions(1);
	const res = await getHelpersCocktails('23', [true]);
	expect(res.isExist).toBe(false);
});

it('should not get cocktail with name', async () => {
	expect.assertions(1);
	const res = await getHelpersCocktails('21', [true], 'blablabla');
	expect(res.isExist).toBe(false);
});

it('should get ingredient with id', async () => {
	expect.assertions(1);
	const res = await getHelpersIngredient(5);
	expect(res.nom).toBe('Rhum');
});

it('should get ingredient with name', async () => {
	expect.assertions(1);
	const res = await getHelpersIngredient('28', 'Rhum');
	expect(res.id).toBe(5);
});

it('should not get ingredient with id', async () => {
	expect.assertions(1);
	const res = await getHelpersIngredient('23');
	expect(res.isExist).toBe(false);
});

it('should not get ingredient with name', async () => {
	expect.assertions(1);
	const res = await getHelpersIngredient('5', 'blablabla');
	expect(res.isExist).toBe(false);
});
