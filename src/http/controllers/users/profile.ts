import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetUserProfileUseCase } from '@/useCases/factories/make-get-user-profile-use-case';

export async function profile(req: FastifyRequest, reply: FastifyReply) {
	const getUserProfileUSeCase = makeGetUserProfileUseCase();

	const { user } = await getUserProfileUSeCase.execute({
		userId: req.user.sub,
	});

	return reply.status(200).send({
		user: {
			...user,
			password_hash: undefined,
		},
	});
}
