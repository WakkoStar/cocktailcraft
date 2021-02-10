const {
	getAllNotesByCocktailId,
	addNote: addNoteInDb,
	updateNote: updateNoteInDb,
} = require('../data');
const { getHelpersCocktails } = require('../../utils/finder');
const { addNote } = require('../mutation');
const { getNoteOfCocktail } = require('../query');

jest.mock('../data');
jest.mock('../../utils/finder');
jest.mock('../../users/data');

const cocktail = {
	id: '18',
	nom: 'Mojito',
	gout_array: ['19', '1'],
	difficulty: 'Moyen',
	user_id: '0',
	username: 'Hugo',
	image: 'Mojito.jpg',
	ingredients: [
		{
			el_id: '30',
			ingredient_id: '138',
			nom: 'Sucre',
			volume: '2.5 morceau(x)',
			id_cocktail: '18',
			id: '30',
		},
		{
			el_id: '29',
			ingredient_id: '23',
			nom: 'Rhum blanc',
			volume: '4 cL',
			id_cocktail: '18',
			id: '29',
		},
		{
			el_id: '31',
			ingredient_id: '162',
			nom: 'feuille(s) de Menthe',
			volume: '5 Aucune unité',
			id_cocktail: '18',
			id: '31',
		},
	],
	descriptions: [
		{
			el_id: '20',
			content: `Dans un shaker, mettez 5 feuille(s) de menthe∰∎≹Puis 4 cl de rhum blanc∰∎≹Puis 2.5 morceau(x) de sucre∰∎≹Ajouter 6 à 8 glaçons dans le 
shaker.∰∎≹Shakez une dizaine de secondes.∰∎≹Remplissez le verre de 2 à 4 glaçons.∰∎≹Mélangez avec une cuillère à mélange ou équivalent.∰∎≹Se boit frais.∰∎≹`,
			preparation: 'Au shaker',
			id_cocktail: '18',
			id: '20',
		},
	],
	isExist: true,
};

const notes = [
	{ id: 0, cocktail_id: 0, user_id: 0, rate: 4 },
	{ id: 1, cocktail_id: 0, user_id: 1, rate: 0 },
];

getAllNotesByCocktailId.mockResolvedValue(notes);

describe('Notes - queries', () => {
	it('should get note of cocktail', async () => {
		getHelpersCocktails.mockResolvedValue(cocktail);
		expect.assertions(2);
		const { rate, count } = await getNoteOfCocktail(null, {
			cocktail_id: 18,
		});
		expect(rate).toBe(2);
		expect(count).toBe(2);
	});

	it('should not get note of cocktail because cocktail does not exists', async () => {
		getHelpersCocktails.mockResolvedValue({ ...cocktail, isExist: false });
		expect.assertions(1);
		try {
			await getNoteOfCocktail(null, {
				cocktail_id: 18,
			});
		} catch (e) {
			expect(e).toBe('Cocktail not found');
		}
	});
});

describe('Notes - mutations', () => {
	const note = { cocktail_id: 18, rate: 4 };
	let ctx = { user: { is_admin: true, id: 0 } };

	addNoteInDb.mockResolvedValue(null);
	updateNoteInDb.mockResolvedValue(null);

	it('should add note', async () => {
		getHelpersCocktails.mockResolvedValue(cocktail);
		ctx.user.id = 3;

		expect.assertions(3);
		const res = await addNote(null, note, ctx);

		expect(addNoteInDb).toHaveBeenCalled();
		expect(updateNoteInDb).not.toHaveBeenCalled();
		expect(res).toBe('Votre note a été ajoutée');
		addNoteInDb.mockClear();
	});

	it('should update note', async () => {
		getHelpersCocktails.mockResolvedValue(cocktail);
		ctx.user.id = 0;

		expect.assertions(3);
		const res = await addNote(null, note, ctx);

		expect(updateNoteInDb).toHaveBeenCalled();
		expect(addNoteInDb).not.toHaveBeenCalled();
		expect(res).toBe('Votre note a été ajoutée');
		updateNoteInDb.mockClear();
	});

	it('should not add note because the cocktail is not found', async () => {
		getHelpersCocktails.mockResolvedValue({ ...cocktail, isExist: false });
		expect.assertions(1);
		try {
			await addNote(null, note, ctx);
		} catch (e) {
			expect(e).toBe('Cocktail not found');
		}
	});

	it('should not add note because the note is invalid', async () => {
		getHelpersCocktails.mockResolvedValue({ ...cocktail });
		expect.assertions(3);
		try {
			await addNote(null, { ...note, rate: 'à' }, ctx);
		} catch (e) {
			expect(e).toBe('Invalid rate');
		}

		try {
			await addNote(null, { ...note, rate: -14 }, ctx);
		} catch (e) {
			expect(e).toBe('Invalid rate');
		}

		try {
			await addNote(null, { ...note, rate: 58 }, ctx);
		} catch (e) {
			expect(e).toBe('Invalid rate');
		}
	});

	it('should not add note because the note is invalid', async () => {
		getHelpersCocktails.mockResolvedValue({ ...cocktail });
		expect.assertions(1);
		try {
			await addNote(null, { ...note, rate: null }, ctx);
		} catch (e) {
			expect(e).toBe('empty fields');
		}
	});
});
