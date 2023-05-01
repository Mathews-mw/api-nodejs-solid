import { beforeEach, describe, expect, it } from 'vitest';

import { CheckInUseCase } from '@/useCases/check-in-use-case';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let checkInUseCase: CheckInUseCase;

describe('Register Use Case', () => {
	beforeEach(() => {
		inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
		checkInUseCase = new CheckInUseCase(inMemoryCheckInsRepository);
	});

	it('Should be able to register a user', async () => {
		const { checkIn } = await checkInUseCase.execute({
			userId: 'userId01',
			gymId: 'gymId01',
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});
});
