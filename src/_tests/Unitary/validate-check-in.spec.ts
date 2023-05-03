import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { ValidateCheckInUseCase } from '@/useCases/validate-check-in-use-case';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { ResourceNotFoundError } from '@/useCases/errors/resource-not-found-error';

let validateCheckInUseCase: ValidateCheckInUseCase;
let checkInsRepository: InMemoryCheckInsRepository;

describe('Validate Check In Use Case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository();
		validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository);

		// vi.useFakeTimers();
	});

	afterEach(() => {
		// vi.useRealTimers();
	});

	it('Should be able to validate the check-in', async () => {
		const createdCheckIn = await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		});

		const { checkIn } = await validateCheckInUseCase.execute({ checkInId: createdCheckIn.id });

		expect(checkIn.validated_at).toEqual(expect.any(Date));
		// expect(checkInsRepository.checkIns[0]).toEqual(expect.any(Date));
	});

	it('Should not be able to validate an inexistent check-in', async () => {
		await expect(() =>
			validateCheckInUseCase.execute({ checkInId: 'inexistent id' })
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
