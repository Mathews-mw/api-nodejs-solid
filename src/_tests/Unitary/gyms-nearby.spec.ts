import { beforeEach, describe, expect, it } from 'vitest';

import { SearchGymsUseCase } from '@/useCases/search-gyms-use-case';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { NearbyGymsUseCase } from '@/useCases/nearby-gyms-use-case';

let gymsRepository: InMemoryGymRepository;
let nearbyGymsUseCase: NearbyGymsUseCase;

describe('Nearby Gym Use Case', () => {
	beforeEach(async () => {
		gymsRepository = new InMemoryGymRepository();
		nearbyGymsUseCase = new NearbyGymsUseCase(gymsRepository);
	});

	it('Should be able to fetch nearby gyms', async () => {
		await gymsRepository.create({
			title: 'Near Gym',
			description: null,
			phone: null,
			latitude: -3.0629127,
			longitude: -60.0040969,
		});

		await gymsRepository.create({
			title: 'Far Gym',
			description: null,
			phone: null,
			latitude: -2.0532011,
			longitude: -60.0234393,
		});

		const { gyms } = await nearbyGymsUseCase.execute({
			userLatitude: -3.1109849,
			userLongitude: -59.9912634,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
	});
});
