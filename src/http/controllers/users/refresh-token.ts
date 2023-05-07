import { FastifyRequest, FastifyReply } from 'fastify';

export async function refreshToken(request: FastifyRequest, reply: FastifyReply) {
	// vai indicar para o jwtVerify verificar os cookies da requição e checar se há um refresh token nela.
	await request.jwtVerify({ onlyCookie: true });

	const { role } = request.user;

	const token = await reply.jwtSign(
		{ role },
		{
			sign: {
				sub: request.user.sub,
			},
		}
	);

	const refreshToken = await reply.jwtSign(
		{ role },
		{
			sign: {
				sub: request.user.sub,
				expiresIn: '7d',
			},
		}
	);

	return reply
		.setCookie('refreshToken', refreshToken, {
			path: '/',
			secure: true,
			sameSite: true,
			httpOnly: true,
		})
		.status(200)
		.send({ token });
}
