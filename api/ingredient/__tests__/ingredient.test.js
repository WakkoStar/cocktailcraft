const {
	getAllIngredients,
	getOneIngredients,
	searchIngredient,
} = require('../query');
const {
	createIngredient,
	modifyIngredient,
	deleteIngredient,
} = require('../mutation');
const {
	getAllIngredients: getIngredients,
	createIngredient: createIngredientInDb,
	modifyIngredient: modifyIngredientInDb,
	deleteIngredient: deleteIngredientInDb,
} = require('../data');

jest.mock('../data');

const ingredientsMocked = [
	{
		id: 0,
		nom: 'Curacao bleu',
		alias: [],
		family_of: [2, 3],
	},
	{
		id: 1,
		nom: 'Rhum Ambré',
		alias: ['Negritta', 'Saint-James'],
		family_of: [5],
	},
	{
		id: 2,
		nom: 'Triple sec',
		alias: [''],
		family_of: [],
	},
	{
		id: 3,
		nom: 'Curacao',
		family_of: [],
		alias: [],
	},
	{
		id: 4,
		nom: 'Pontarlier',
		family_of: [],
		alias: ['Pont-doux'],
	},
	{
		id: 5,
		nom: 'Rhum',
		family_of: [],
		alias: [],
	},
];

describe('Ingredients - queries', () => {
	getIngredients.mockResolvedValue(ingredientsMocked);
	it('should get all ingredients', async () => {
		expect.assertions(1);
		const res = await getIngredients();
		expect(res[4].nom).toBe('Pontarlier');
	});

	it('should get one ingredient', async () => {
		expect.assertions(1);
		const res = await getOneIngredients(null, { id: 1 });
		expect(res.nom).toBe('Rhum Ambré');
	});

	it('should not find this ingredient', async () => {
		expect.assertions(1);
		try {
			await getOneIngredients(null, { id: 8 });
		} catch (e) {
			expect(e).toBe('ingredient no founded');
		}
	});

	it('should find ingredient without families', async () => {
		expect.assertions(2);
		const res = await searchIngredient(null, {
			search: 'Rhum Ambr',
			isFamilyIncluded: false,
		});
		expect(res.length).toBe(1);
		expect(res[0].nom).toBe('Rhum Ambré');
	});

	it('should find ingredient with families', async () => {
		expect.assertions(2);
		const res = await searchIngredient(null, {
			search: 'Rhu',
			isFamilyIncluded: false,
		});
		expect(res.length).toBe(2);
		expect(res[0].nom).toBe('Rhum Ambré');
	});

	it('should find ingredient with alias', async () => {
		expect.assertions(2);
		const res = await searchIngredient(null, {
			search: 'Negri',
			isFamilyIncluded: false,
		});
		expect(res.length).toBe(1);
		expect(res[0].nom).toBe('Rhum Ambré');
	});

	it('should not find ingredient with alias', async () => {
		expect.assertions(1);
		const res = await searchIngredient(null, {
			search: 'Blabalbalbla',
			isFamilyIncluded: false,
		});
		expect(res.length).toBe(0);
	});

	//TODO : getBestIngredients, inventorySelection
});

describe('Ingredients - mutations', () => {
	getIngredients.mockResolvedValue(ingredientsMocked);
	createIngredientInDb.mockResolvedValue(null);
	modifyIngredientInDb.mockResolvedValue(null);
	deleteIngredientInDb.mockResolvedValue(null);

	let ctx = { user: { is_admin: true, id: 0 } };

	let ingredient = { nom: 'Test', alias: ['Test', 'Test'], family_of: [0] };

	it('should create ingredient', async () => {
		expect.assertions(1);
		const res = await createIngredient(null, ingredient, ctx);
		expect(res).toBe(`Test vient d'être créé avec succès`);
	});

	it('should not create ingredient because he is not admin', async () => {
		expect.assertions(1);
		ctx.user.is_admin = false;
		try {
			await createIngredient(null, ingredient, ctx);
		} catch (e) {
			expect(e).toBe(`Not admin`);
		}
	});
	it('should not create ingredient because its already exists', async () => {
		expect.assertions(1);
		ctx.user.is_admin = true;
		try {
			await createIngredient(null, { ...ingredient, nom: 'Rhum' }, ctx);
		} catch (e) {
			expect(e).toBe(`Ingredient already exists`);
		}
	});

	it('should modify ingredient', async () => {
		expect.assertions(1);
		const res = await modifyIngredient(null, { ...ingredient, id: 2 }, ctx);
		expect(res).toBe(
			`L'ingrédient vient d'être modifié avec succès (ingrédient: Triple sec)`
		);
	});

	it('should not modify ingredient because he is not admin', async () => {
		expect.assertions(1);
		ctx.user.is_admin = false;
		try {
			await modifyIngredient(null, { ...ingredient, id: 2 }, ctx);
		} catch (e) {
			expect(e).toBe(`Not admin`);
		}
	});
	it('should not modify ingredient because its ID is not founded', async () => {
		expect.assertions(1);
		ctx.user.is_admin = true;
		try {
			await modifyIngredient(null, { ...ingredient, id: 19 }, ctx);
		} catch (e) {
			expect(e).toBe(`ID no founded`);
		}
	});
	it('should not modify ingredient because its ID is not founded', async () => {
		expect.assertions(1);
		try {
			await modifyIngredient(
				null,
				{ ...ingredient, nom: null, id: 3 },
				ctx
			);
		} catch (e) {
			expect(e).toBe(`empty fields`);
		}
	});

	it('should delete ingredient', async () => {
		expect.assertions(1);
		const res = await deleteIngredient(null, { id: 0 }, ctx);
		expect(res).toBe(
			`L'ingrédient vient d'être supprimé avec succès (ingrédient: Curacao bleu)`
		);
	});
});
