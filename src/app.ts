import fastify from 'fastify';
import { ZodError } from 'zod';
import fastifyCookie from '@fastify/cookie';

import { env } from './env';
import fastifyJwt from '@fastify/jwt';
import { gymsRoutes } from './http/controllers/gyms/routes';
import { usersRoutes } from './http/controllers/users/routes';
import { checkInsRoutes } from './http/controllers/check-ins/routes';

export const app = fastify();

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false, // indica que esse cookie não possui uma assinatura, não é hashed. Isso serve para indicar que essa informação de fato foi gerado pelo domínio desse back-end
	},
	sign: {
		expiresIn: '10m',
	},
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({ message: 'Validation error', issues: error.format() });
	}

	if (env.NODE_ENV !== 'production') {
		console.log('handler error:', error);
	}

	return reply.status(500).send({ message: 'Internal server error.' });
});
