import { FastifyInstance } from 'fastify';

import { create } from './create';
import { history } from './history';
import { metrics } from './metrics';
import { valdiate } from './validate';
import { authMiddleware } from '@/http/middlewares/auth-middleware';

export async function checkInsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', authMiddleware);

	app.get('/check-ins/history', history);
	app.get('/check-ins/metrics', metrics);

	app.post('/gyms/:gymId/check-ins', create);
	app.patch('/check-ins/:checkInId/validate', valdiate);
}
