import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { AuthenticateUseCase } from '../useCases/authenticate-use-case';
import { InvalidCredentialsError } from '../useCases/errors/invalid-credentials-error';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';

let userRepository: InMemoryUserRepository;
let authenticateUseCase: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		authenticateUseCase = new AuthenticateUseCase(userRepository);
	});

	it('Should be able to authenticate', async () => {
		await userRepository.create({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password_hash: await hash('abc456', 6),
		});

		const { user } = await authenticateUseCase.execute({
			email: 'john.doe@example.com',
			password: 'abc456',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('Should not be able to authenticate with wrong email', async () => {
		await expect(() =>
			authenticateUseCase.execute({
				email: 'john.doe@example.com',
				password: 'abc456',
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it('Should not be able to authenticate with wrong password', async () => {
		await userRepository.create({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password_hash: await hash('abc456', 6),
		});

		await expect(() =>
			authenticateUseCase.execute({
				email: 'john.doe@example.com',
				password: 'abc123',
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
