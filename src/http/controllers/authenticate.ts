import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { InvalidCredentialsError } from '@/useCases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/useCases/factories/make-authenticate-use-case';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		email: z.string().email(),
		password: z.string(),
	});

	const { email, password } = registerBodySchema.parse(request.body);

	try {
		const authenticateUseCase = makeAuthenticateUseCase();

		const { user } = await authenticateUseCase.execute({ email, password });

		const token = await reply.jwtSign(
			{},
			{
				sign: {
					sub: user.id,
				},
			}
		);

		return reply.status(200).send({ token });
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(409).send({ message: error.message });
		}

		throw error;
	}
}
