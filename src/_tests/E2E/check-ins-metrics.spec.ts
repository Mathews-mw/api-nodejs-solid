import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';

describe('Check-ins Metrics (E2E)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('Should be able to get the total of check-ins', async () => {
		const { token } = await createAndAuthenticateUser(app);

		const user = await prisma.user.findFirstOrThrow();

		const gym = await prisma.gym.create({
			data: {
				title: 'Bluefit Gym',
				latitude: -3.1109849,
				longitude: -59.9912634,
			},
		});

		await prisma.checkIn.createMany({
			data: [
				{
					gym_id: gym.id,
					user_id: user.id,
				},
				{
					gym_id: gym.id,
					user_id: user.id,
				},
			],
		});

		const response = await request(app.server).get('/check-ins/metrics').set('Authorization', `Bearer ${token}`).send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.checkInsCount).toEqual(2);
	});
});
