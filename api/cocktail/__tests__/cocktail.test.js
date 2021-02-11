const {
	getAllCocktails: getCocktails,
	getCreatedCocktailsByUser: getCreatedCocktailsByUserDb,
	createCocktail: createCocktailInDb,
	modifyCocktail: modifyCocktailInDb,
	deleteCocktail: deleteCocktailInDb,
	setVisibility: setVisibilityInDb,
	modifyCocktailImage,
} = require('../data');
const {
	getAllCocktails,
	getOneCocktails,
	getAvailableCocktails,
	getCraftedCocktails,
	getCreatedCocktailsByUser,
} = require('../query');
const {
	createCocktail,
	modifyCocktail,
	deleteCocktail,
	setVisibility,
} = require('../mutation');

const { getHelpersCocktails } = require('../../utils/finder');
const { mockCocktails, mockCtx, mockCocktail } = require('../../mocks/data');

const {
	uploadFile,
	isValidDifficulty,
	isValidName,
	isValidGouts,
} = require('../helpers');

jest.mock('../../utils/finder');
jest.mock('../data');
jest.mock('../helpers');

let ctx = mockCtx;

getCocktails.mockResolvedValue(mockCocktails);
getHelpersCocktails.mockResolvedValue(mockCocktail);
getCreatedCocktailsByUserDb.mockResolvedValue(mockCocktails);
createCocktailInDb.mockResolvedValue(1);
uploadFile.mockResolvedValue(null);
isValidDifficulty.mockResolvedValue(true);
isValidName.mockResolvedValue(true);
isValidGouts.mockResolvedValue(true);

describe('cocktails - queries', () => {
	it('Should get all cocktails', async () => {
		expect.assertions(1);
		const res = await getAllCocktails(null, { is_visible: false }, ctx);
		expect(res[0].id).toBe('18');
	});

	it('Should not get all cocktails because its not admin ', async () => {
		expect.assertions(1);
		ctx.user.is_admin = false;
		try {
			await getAllCocktails(null, { is_visible: false }, ctx);
		} catch (e) {
			expect(e).toBe('Not admin');
		}
	});

	it('Should get all cocktails', async () => {
		expect.assertions(1);
		const res = await getAllCocktails(null, { is_visible: true }, ctx);
		expect(res[0].id).toBe('18');
	});

	it('should get one cocktail', async () => {
		expect.assertions(1);
		const res = await getOneCocktails(
			null,
			{ id: 18, is_visible: true },
			ctx
		);
		expect(res).toBe(mockCocktail);
	});

	it('Should not get one cocktails because its not admin ', async () => {
		expect.assertions(1);
		try {
			await getOneCocktails(null, { id: 18, is_visible: false }, ctx);
		} catch (e) {
			expect(e).toBe('Not admin');
		}
	});

	it('Should not get one cocktails because it doesnt exists ', async () => {
		expect.assertions(1);
		getHelpersCocktails.mockResolvedValue({
			...mockCocktail,
			isExist: false,
		});
		try {
			await getOneCocktails(null, { id: 18, is_visible: true }, ctx);
		} catch (e) {
			expect(e).toBe('cocktail no founded');
		}
	});

	it('should get created cocktail by user', async () => {
		expect.assertions(1);
		const res = await getCreatedCocktailsByUser(null, {}, ctx);
		expect(res[0].id).toBe('18');
	});

	//TO DO : get available cocktails, getCraftedCocktails
});

let input = {
	nom: 'Test',
	gout_array: [4, 3],
	difficulty: 'Facile',
	file: null,
};

const mockFile = new Promise((resolve, reject) => {
	resolve({ createReadStream: null });
});
describe('cocktails - mutations', () => {
	it('should create cocktail without upload', async () => {
		expect.assertions(3);
		const res = await createCocktail(null, { ...input }, ctx);
		expect(res).toBe('1');
		expect(createCocktailInDb).toHaveBeenCalled();
		expect(uploadFile).not.toHaveBeenCalled();
		createCocktailInDb.mockClear();
		uploadFile.mockClear();
	});
	it('should create cocktail with upload', async () => {
		expect.assertions(3);
		const res = await createCocktail(
			null,
			{ ...input, file: mockFile },
			ctx
		);
		expect(res).toBe('1');
		expect(createCocktailInDb).toHaveBeenCalled();
		expect(uploadFile).toHaveBeenCalled();
		createCocktailInDb.mockClear();
		uploadFile.mockClear();
	});

	it('should not create cocktail because limit of created cocktail is exceeded', async () => {
		ctx.user.cocktail_created_in_day = 10;
		expect.assertions(1);
		try {
			await createCocktail(null, { ...input, file: mockFile }, ctx);
		} catch (e) {
			expect(e).toBe(
				"Cocktail already exists or you can't create new cocktail"
			);
		}
	});

	it('should modify cocktail without upload', async () => {
		ctx.user.is_admin = true;
		getHelpersCocktails.mockResolvedValue(mockCocktail);
		expect.assertions(3);
		const res = await modifyCocktail(
			null,
			{ ...input, id: '18', file: null },
			ctx
		);
		expect(res).toBe(`Cocktail modified`);
		expect(modifyCocktailInDb).toHaveBeenCalled();
		expect(uploadFile).not.toHaveBeenCalled();
		modifyCocktailInDb.mockClear();
		uploadFile.mockClear();
	});
	it('should modify cocktail with upload', async () => {
		getHelpersCocktails.mockResolvedValue(mockCocktail);
		expect.assertions(3);
		const res = await modifyCocktail(
			null,
			{ ...input, id: '18', file: mockFile },
			ctx
		);
		expect(res).toBe(`Cocktail modified`);
		expect(modifyCocktailInDb).toHaveBeenCalled();
		expect(uploadFile).toHaveBeenCalled();
		modifyCocktailInDb.mockClear();
		uploadFile.mockClear();
	});

	it('should not modify cocktail because it doesnt exists', async () => {
		getHelpersCocktails.mockResolvedValue({
			...mockCocktail,
			isExist: false,
		});
		expect.assertions(2);

		try {
			await modifyCocktail(
				null,
				{ ...input, id: '18', file: mockFile },
				ctx
			);
		} catch (e) {
			expect(e).toBe('Cocktail not modified');
		}
		expect(getHelpersCocktails).toHaveBeenCalled();
		getHelpersCocktails.mockClear();
	});

	it('should not modify cocktail because one param is null', async () => {
		expect.assertions(2);

		try {
			await modifyCocktail(
				null,
				{ ...input, nom: null, id: '18', file: mockFile },
				ctx
			);
		} catch (e) {
			expect(e).toBe('Cocktail not modified');
		}
		expect(getHelpersCocktails).not.toHaveBeenCalled();
		getHelpersCocktails.mockClear();
	});

	it('should not modify cocktail because its not admin', async () => {
		ctx.user.is_admin = false;
		expect.assertions(1);

		try {
			await modifyCocktail(
				null,
				{ ...input, id: '18', file: mockFile },
				ctx
			);
		} catch (e) {
			expect(e).toBe('Not admin');
		}
	});

	it('should delete cocktail', async () => {
		ctx.user.is_admin = true;
		getHelpersCocktails.mockResolvedValue(mockCocktail);
		expect.assertions(2);
		const res = await deleteCocktail(null, { id: '18' }, ctx);
		expect(res).toBe('Cocktail deleted');
		expect(deleteCocktailInDb).toHaveBeenCalled();
	});
});
