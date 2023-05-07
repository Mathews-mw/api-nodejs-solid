import { beforeEach, describe, expect, it } from 'vitest';

import { SearchGymsUseCase } from '@/useCases/search-gyms-use-case';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';

let gymsRepository: InMemoryGymRepository;
let searchGymsUseCase: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
	beforeEach(async () => {
		gymsRepository = new InMemoryGymRepository();
		searchGymsUseCase = new SearchGymsUseCase(gymsRepository);
	});

	it('Should be able to search for gyms', async () => {
		await gymsRepository.create({
			title: 'Blue Fit',
			description: null,
			phone: null,
			latitude: -3.0629127,
			longitude: -60.0040969,
		});

		await gymsRepository.create({
			title: 'Live Towers',
			description: null,
			phone: null,
			latitude: -3.0686406,
			longitude: -59.9964102,
		});

		await gymsRepository.create({
			title: 'Live Cities',
			description: null,
			phone: null,
			latitude: -3.0567791,
			longitude: -60.0282625,
		});

		const { gyms } = await searchGymsUseCase.execute({
			query: 'live',
			page: 1,
		});

		expect(gyms).toHaveLength(2);
		expect(gyms).toEqual([expect.objectContaining({ title: 'Live Towers' }), expect.objectContaining({ title: 'Live Cities' })]);
	});

	it('Should be able to fetch paginate gyms search', async () => {
		for (let i = 1; i <= 22; i++) {
			await gymsRepository.create({
				title: `Blue Fit ${i}`,
				description: null,
				phone: null,
				latitude: -3.0629127,
				longitude: -60.0040969,
			});
		}

		const { gyms } = await searchGymsUseCase.execute({
			query: 'blue',
			page: 2,
		});

		expect(gyms).toHaveLength(2);
		expect(gyms).toEqual([expect.objectContaining({ title: 'Blue Fit 21' }), expect.objectContaining({ title: 'Blue Fit 22' })]);
	});
});
