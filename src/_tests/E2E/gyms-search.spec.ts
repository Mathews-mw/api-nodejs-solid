import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Search Gyms (E2E)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('Should be able to search gyms by title', async () => {
		const { token } = await createAndAuthenticateUser(app, true);

		await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
			title: 'Bluefit Gym',
			description: 'Description create gym',
			phone: '99999999999',
			latitude: -3.1109849,
			longitude: -59.9912634,
		});

		await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
			title: 'Live Towers',
			description: 'Description create gym',
			phone: '99999999999',
			latitude: -3.0686406,
			longitude: -59.9964102,
		});

		const response = await request(app.server)
			.get('/gyms/search')
			.query({
				query: 'bluefit',
			})
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.gyms).toHaveLength(1);
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: 'Bluefit Gym',
			}),
		]);
	});
});
