import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { makeUserCheckInsHistoryUseCase } from '@/useCases/factories/make-user-check-ins-history-use-case';

export async function history(request: FastifyRequest, reply: FastifyReply) {
	const checkInHistoryQuerySchema = z.object({
		page: z.coerce.number().default(1),
	});

	const { page } = checkInHistoryQuerySchema.parse(request.query);

	const userCheckInsHistoryUseCase = makeUserCheckInsHistoryUseCase();

	const { checkIns } = await userCheckInsHistoryUseCase.execute({
		userId: request.user.sub,
		page,
	});

	return reply.status(200).send({
		checkIns,
	});
}
