import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { CreateGymUseCase } from '@/useCases/create-gym-use-case';
import { beforeEach, describe, expect, it } from 'vitest';

let gymRepository: InMemoryGymRepository;
let createGymUserCase: CreateGymUseCase;

describe('Create Gym Use Case', () => {
	beforeEach(() => {
		gymRepository = new InMemoryGymRepository();
		createGymUserCase = new CreateGymUseCase(gymRepository);
	});

	it('Should be able to create gym', async () => {
		const { gym } = await createGymUserCase.execute({
			title: 'Bluefit Gym',
			description: null,
			phone: null,
			latitude: -3.1109849,
			longitude: -59.9912634,
		});

		expect(gym.id).toEqual(expect.any(String));
	});
});
