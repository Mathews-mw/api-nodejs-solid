import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Nearby Gyms (E2E)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('Should be able to search nearby gyms', async () => {
		const { token } = await createAndAuthenticateUser(app);

		await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
			title: 'Bluefit Gym',
			description: 'Description create gym',
			phone: '99999999999',
			latitude: -3.0629127,
			longitude: -60.0040969,
		});

		await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
			title: 'Live Towers',
			description: 'Description create gym',
			phone: '99999999999',
			latitude: -2.0532011,
			longitude: -60.0234393,
		});

		const response = await request(app.server)
			.get('/gyms/nearby')
			.query({
				latitude: -3.0629127,
				longitude: -60.0040969,
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
