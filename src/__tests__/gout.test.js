import { getAllGouts, getOneGout } from '../api/gouts/query';

it('should get one gout', async () => {
	const gout = await getOneGout(0);
	expect(gout.nom).toBe('Mentholé');
});

it('should get an error with bad ID of gout', async () => {
	const gout = await getOneGout(7);
	expect(gout).toBeNull();
});

it('should get all gouts', async () => {
	const gouts = await getAllGouts();
	expect(gouts.length).toBe(3);
});
