import { beforeEach, describe, expect, it } from 'vitest';

import { GetUserMetricsUseCase } from '@/useCases/get-user-metrics-use-case';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

let checkInsRepository: InMemoryCheckInsRepository;
let getUserMetricsUseCase: GetUserMetricsUseCase;

describe('Get USer Metrics Use Case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository();
		getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository);
	});

	it('Should be able to get check-ins count from metrics', async () => {
		await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		});

		await checkInsRepository.create({
			gym_id: 'gym-02',
			user_id: 'user-01',
		});

		const { checkInsCount } = await getUserMetricsUseCase.execute({
			userId: 'user-01',
		});

		expect(checkInsCount).toEqual(2);
	});
});
