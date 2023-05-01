import { compare } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { RegisterUserCase } from '../useCases/register-use-case';
import { UserAlreadyExistsError } from '../useCases/errors/user-already-exists-error';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';

let userRepository: InMemoryUserRepository;
let registerUserCase: RegisterUserCase;

describe('Register Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		registerUserCase = new RegisterUserCase(userRepository);
	});

	it('Should be able to register a user', async () => {
		const { user } = await registerUserCase.execute({
			name: 'John Doe',
			email: 'john-doe@example.com',
			password: 'abc456',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('Should hash user password upon registration', async () => {
		const { user } = await registerUserCase.execute({
			name: 'John Doe',
			email: 'john-doe@example.com',
			password: 'abc456',
		});

		const isPasswordCorrectlyHashed = await compare('abc456', user.password_hash);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it('Should not be able to register with the same email twice', async () => {
		const email = 'john-doe@example.com';

		await registerUserCase.execute({
			name: 'John Doe',
			email,
			password: 'abc456',
		});

		await expect(() =>
			registerUserCase.execute({
				name: 'John Doe',
				email,
				password: 'abc456',
			})
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});
});
