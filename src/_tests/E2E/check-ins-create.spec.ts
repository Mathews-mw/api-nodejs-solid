import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';

describe('Create Check-ins (E2E)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('Should be able to create a check-in', async () => {
		const { token } = await createAndAuthenticateUser(app);

		const gym = await prisma.gym.create({
			data: {
				title: 'Bluefit Gym',
				latitude: -3.1109849,
				longitude: -59.9912634,
			},
		});

		const response = await request(app.server).post(`/gyms/${gym.id}/check-ins`).set('Authorization', `Bearer ${token}`).send({
			latitude: -3.1109849,
			longitude: -59.9912634,
		});

		expect(response.statusCode).toEqual(201);
	});
});
