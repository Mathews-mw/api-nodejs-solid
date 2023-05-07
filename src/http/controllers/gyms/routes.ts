import { FastifyInstance } from 'fastify';

import { create } from './create';
import { nearby } from './nearby';
import { search } from './search';
import { authMiddleware } from '@/http/middlewares/auth-middleware';

export async function gymsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', authMiddleware);

	app.get('/gyms/search', search);
	app.get('/gyms/nearby', nearby);

	app.post('/gyms', create);
}
