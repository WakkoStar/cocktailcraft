const { getAllGouts, getOneGouts } = require('../query');
const { createGout, modifyGout, deleteGout } = require('../mutation');
const {
	getAllGouts: getGouts,
	createGout: createGoutInDb,
	modifyGout: modifyGoutInDb,
	deleteGout: deleteGoutInDb,
} = require('../data');

jest.mock('../data');

describe('Gouts - queries', () => {
	const goutsMocked = [
		{ id: 0, nom: 'Menthe' },
		{ id: 1, nom: 'Rhum' },
	];
	getGouts.mockResolvedValue(goutsMocked);

	it('should get all gouts', async () => {
		expect.assertions(1);
		const res = await getAllGouts();
		expect(res[0].nom).toEqual('Menthe');
	});

	it('should not find gout', async () => {
		expect.assertions(1);
		try {
			await getOneGouts(null, { id: 3 });
		} catch (e) {
			expect(e).toEqual('Gout no founded');
		}
	});

	it('should find gout', async () => {
		expect.assertions(1);
		const res = await getOneGouts(null, { id: 0 });
		expect(res.nom).toBe('Menthe');
	});
});

describe('Gouts - mutations', () => {
	const goutsMocked = [
		{ id: 0, nom: 'Menthe' },
		{ id: 1, nom: 'Rhum' },
	];

	getGouts.mockResolvedValue(goutsMocked);
	createGoutInDb.mockResolvedValue(null);
	modifyGoutInDb.mockResolvedValue(null);
	deleteGoutInDb.mockResolvedValue(null);

	let nom = 'Test';
	let ctx = { user: { is_admin: true, id: 0 } };
	let id = 0;

	it('should create Gout', async () => {
		expect.assertions(1);
		const res = await createGout(null, { nom }, ctx);
		expect(res).toBe(`${nom} vient d'être créé avec succès`);
	});

	it('should not create Gout because he is not admin', async () => {
		ctx.user.is_admin = false;
		expect.assertions(1);
		try {
			await createGout(null, { nom }, ctx);
		} catch (e) {
			expect(e).toBe('Not admin');
		}
	});

	it('should not create Gout because its already exists', async () => {
		nom = 'Menthe';
		ctx.user.is_admin = true;
		expect.assertions(1);
		try {
			await createGout(null, { nom }, ctx);
		} catch (e) {
			expect(e).toBe('Gout already exists');
		}
	});

	it('should modify Gout', async () => {
		nom = 'Test';
		expect.assertions(1);
		const res = await modifyGout(null, { nom, id }, ctx);
		expect(res).toBe(
			`Le goût vient d'être modifié avec succès (gout: Menthe)`
		);
	});

	it('should not modify Gout because id is not founded', async () => {
		id = 3;
		expect.assertions(1);
		try {
			await modifyGout(null, { nom, id }, ctx);
		} catch (e) {
			expect(e).toBe('ID no founded');
		}
	});

	it('should not modify Gout because name is not given', async () => {
		id = 0;
		nom = null;
		expect.assertions(1);
		try {
			await modifyGout(null, { nom, id }, ctx);
		} catch (e) {
			expect(e).toBe('empty fields');
		}
	});

	it('should not modify Gout because he is not admin', async () => {
		id = 0;
		nom = 'Test';
		ctx.user.is_admin = false;
		expect.assertions(1);
		try {
			await modifyGout(null, { nom, id }, ctx);
		} catch (e) {
			expect(e).toBe('Not admin');
		}
	});

	it('should delete Gout', async () => {
		id = 1;
		expect.assertions(1);
		ctx.user.is_admin = true;
		const res = await deleteGout(null, { id }, ctx);
		expect(res).toBe(
			`Le goût vient d'être supprimé avec succès (gout: Rhum)`
		);
	});
});
