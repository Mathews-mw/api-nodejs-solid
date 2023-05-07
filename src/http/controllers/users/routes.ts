import { FastifyInstance } from 'fastify';

import { profile } from './profile';
import { register } from './register';
import { authenticate } from './authenticate';
import { authMiddleware } from '../../middlewares/auth-middleware';
import { refreshToken } from './refresh-token';

export async function usersRoutes(app: FastifyInstance) {
	app.post('/user', register);
	app.post('/sessions', authenticate);

	app.patch('/token/refresh', refreshToken);

	app.get('/me', { onRequest: [authMiddleware] }, profile);
}
