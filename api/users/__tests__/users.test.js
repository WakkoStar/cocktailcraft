const {
	getUser: getUserInDb,
	getAllLevels,
	getCreatedCocktailCountByUserId,
	getNotesCountByUserId,
	deleteUser: deleteUserInDb,
	reportUser: reportUserInDb,
	banUser: banUserInDb,
} = require('../data');

const { getUserInfo } = require('../query');
const { deleteUser, reportUser, banUser } = require('../mutation');

jest.mock('../data');
let ctx = { user: { is_admin: true, id: 0 } };

const user = {
	id: 0,
	username: 'Hugo',
	cocktail_created_in_day: -990,
	is_admin: true,
	provider_id: 2827765287470350,
	experience: 200,
	provider_name: 'facebook',
	report_count: 0,
	has_ban: false,
	cocktail_crafted_count: 25,
};

const levels = [
	{ id: 1, rank: 'Bleu', experience: 0 },
	{ id: 2, rank: 'Débutant', experience: 100 },
	{ id: 3, rank: 'Aspirant', experience: 300 },
];

const count = 5;

getAllLevels.mockResolvedValue(levels);
getCreatedCocktailCountByUserId.mockResolvedValue(count);
getNotesCountByUserId.mockResolvedValue(count);
banUserInDb.mockResolvedValue(null);

describe('user - queries', () => {
	getUserInDb.mockResolvedValue(user);
	it('should get user info', async () => {
		expect.assertions(1);
		const res = await getUserInfo(null, {}, ctx);
		expect(res.level_progression).toBe(50);
	});
});

describe('user - mutations', () => {
	it('should delete user', async () => {
		expect.assertions(1);
		const res = await deleteUser(null, {}, ctx);
		expect(res).toBe(
			`L'utilisateur vient d'être supprimé avec succès (utilisateur: Hugo)`
		);
	});

	it('should not delete user', async () => {
		getUserInDb.mockResolvedValue(undefined);
		expect.assertions(1);
		ctx.user.id = 2;
		try {
			await deleteUser(null, {}, ctx);
		} catch (e) {
			expect(e).toBe('User not found');
		}
	});

	it('should report user', async () => {
		getUserInDb.mockResolvedValue({ ...user, report_count: 1 });
		ctx.user.id = 0;
		expect.assertions(2);
		const res = await reportUser(null, { user_id: 0 }, ctx);
		expect(res).toBe(
			`L'utilisateur a été reporté avec succès (utilisateur :Hugo)`
		);
		expect(banUserInDb).not.toHaveBeenCalled();
	});

	it('should report and ban user', async () => {
		getUserInDb.mockResolvedValue({ ...user, report_count: 2 });
		expect.assertions(2);
		const res = await reportUser(null, { user_id: 0 }, ctx);
		expect(res).toBe(
			`L'utilisateur a été reporté avec succès (utilisateur :Hugo)`
		);
		expect(banUserInDb).toHaveBeenCalled();
	});

	it('should not report user because its not admin', async () => {
		expect.assertions(1);
		ctx.user.is_admin = false;
		try {
			await reportUser(null, { user_id: 0 }, ctx);
		} catch (e) {
			expect(e).toBe('Not Admin');
		}
	});

	it('should ban user', async () => {
		ctx.user.is_admin = true;
		expect.assertions(1);
		const res = await banUser(null, { user_id: 0 }, ctx);
		expect(res).toBe(
			`L'utilisateur a été banni avec succès (utilisateur :Hugo)`
		);
	});

	it('should not ban user', async () => {
		getUserInDb.mockResolvedValue(undefined);
		expect.assertions(1);
		try {
			await banUser(null, { user_id: 0 }, ctx);
		} catch (e) {
			expect(e).toBe('User not founded');
		}
	});

	it('should not ban user because its not admin', async () => {
		expect.assertions(1);
		ctx.user.is_admin = false;
		try {
			await banUser(null, { user_id: 0 }, ctx);
		} catch (e) {
			expect(e).toBe('Not Admin');
		}
	});
});
