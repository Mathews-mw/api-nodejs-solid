import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create Gym (E2E)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('Should be able to create a gym', async () => {
		const { token } = await createAndAuthenticateUser(app, true);

		const response = await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
			title: 'Bluefit Gym',
			description: 'Description create gym',
			phone: '99999999999',
			latitude: -3.1109849,
			longitude: -59.9912634,
		});

		expect(response.statusCode).toEqual(201);
	});
});
