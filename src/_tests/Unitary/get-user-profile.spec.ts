import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { GetUserProfileUseCase } from '@/useCases/get-user-profile-use-case';
import { ResourceNotFoundError } from '@/useCases/errors/resource-not-found-error';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';

let userRepository: InMemoryUserRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe('Get user profile Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		getUserProfileUseCase = new GetUserProfileUseCase(userRepository);
	});

	it('Should be able to get user profile', async () => {
		const createdUser = await userRepository.create({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password_hash: await hash('abc456', 6),
		});

		const { user } = await getUserProfileUseCase.execute({
			userId: createdUser.id,
		});

		expect(user.name).toEqual('John Doe');
	});

	it('Should not be able to get user profile with wrong id', async () => {
		await expect(() =>
			getUserProfileUseCase.execute({
				userId: 'non-existing-id',
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
