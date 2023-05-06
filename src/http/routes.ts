import { FastifyInstance } from 'fastify';

import { register } from './controllers/register';
import { authenticate } from './controllers/authenticate';
import { profile } from './controllers/profile';
import { authMiddleware } from './middlewares/auth-middleware';

export async function appRoutes(app: FastifyInstance) {
	app.post('/user', register);
	app.post('/sessions', authenticate);

	app.get('/me', { onRequest: [authMiddleware] }, profile);
}
