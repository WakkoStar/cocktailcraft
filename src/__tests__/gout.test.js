import { createGout, deleteGout } from '../api/gouts/mutation';
import { getAllGouts, getOneGout } from '../api/gouts/query';
import { resetDbForTest } from '../../api/utils/resetDbForTest';

it('resetDb', async () => {
	const reset = await resetDbForTest();
	expect(reset).not.toBe('Mentholé');
});

it('should get one gout', async () => {
	const gout = await getOneGout(0);
	expect(gout.nom).toBe('Mentholé');
});

it('should get an error with bad ID of gout', async () => {
	const gout = await getOneGout(7);
	expect(gout.message).toMatch(/no founded/);
});

it('should get all gouts', async () => {
	const gouts = await getAllGouts();
	expect(gouts.length).toBeGreaterThan(1);
});

it('should create new gout : "test"', async () => {
	const createGoutMsg = await createGout('test');
	expect(createGoutMsg).toMatch(/succès/);
});

it('shoud delete the gout : "test"', async () => {
	const deleteGoutMsg = await deleteGout(0);
	expect(deleteGoutMsg).toMatch(/succès/);
});

it('shoud get an error on deleting the gout : "test"', async () => {
	const deleteGoutMsg = await deleteGout(100);
	expect(deleteGoutMsg.message).toMatch(/no ID founded/);
});
