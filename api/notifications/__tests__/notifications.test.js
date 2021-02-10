const { getAllNotificationsByUserId } = require('../data');
const { getUser } = require('../../users/data');
const { addNotifications, deleteNotifications } = require('../mutation');
const { getNotifications } = require('../query');

jest.mock('../data');
jest.mock('../../users/data');

const notifications = [
	{ id: 0, user_id: 0, time: null, message: 'test' },
	{ id: 1, user_id: 0, time: null, message: 'test' },
];
let ctx = { user: { is_admin: true, id: 0 } };
let notification = { message: 'test', user_id: 0 };
getAllNotificationsByUserId.mockResolvedValue(notifications);

describe('Notifications - queries', () => {
	it('should get all notifications', async () => {
		expect.assertions(1);
		const res = await getNotifications(null, {}, ctx);
		expect(res[0].message).toBe('test');
	});
});

describe('Notifications - mutations', () => {
	it('should add notifications', async () => {
		getUser.mockResolvedValue({ id: 0, username: 'Test' });
		expect.assertions(1);
		const res = await addNotifications(null, notification, ctx);
		expect(res).toBe('Notification ajouté avec succès (user: Test)');
	});

	it('should not add notifications because user is not found', async () => {
		getUser.mockResolvedValue(undefined);
		expect.assertions(1);
		try {
			await addNotifications(null, notification, ctx);
		} catch (e) {
			expect(e).toBe('User not found');
		}
	});

	it('should not add notifications because empty fields', async () => {
		expect.assertions(3);

		try {
			await addNotifications(
				null,
				{ ...notification, message: null },
				ctx
			);
		} catch (e) {
			expect(e).toBe('empty fields');
		}

		try {
			await addNotifications(null, { ...notification, message: '' }, ctx);
		} catch (e) {
			expect(e).toBe('empty fields');
		}

		try {
			await addNotifications(
				null,
				{ ...notification, user_id: null },
				ctx
			);
		} catch (e) {
			expect(e).toBe('empty fields');
		}
	});

	it('should not add notifications because user is not admin', async () => {
		ctx.user.is_admin = false;
		expect.assertions(1);
		try {
			await addNotifications(null, notification, ctx);
		} catch (e) {
			expect(e).toBe('Not admin');
		}
	});

	it('should delete notifications', async () => {
		getUser.mockResolvedValue({ id: 0, username: 'Test' });
		const res = await deleteNotifications(null, { id: 0 }, ctx);
		expect.assertions(1);
		expect(res).toBe('Notification supprimé avec succès (user: Test)');
	});

	it('should not add notifications because user is not found', async () => {
		getUser.mockResolvedValue(undefined);
		expect.assertions(1);
		try {
			await deleteNotifications(null, { id: 0 }, ctx);
		} catch (e) {
			expect(e).toBe('User not found');
		}
	});

	it('should not add notifications because user is not admin', async () => {
		expect.assertions(1);
		try {
			await deleteNotifications(null, { id: null }, ctx);
		} catch (e) {
			expect(e).toBe('empty fields');
		}
	});
});
