import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Decimal } from '@prisma/client/runtime/library';
import { CheckInUseCase } from '@/useCases/check-in-use-case';
import { MaxDistanceError } from '@/useCases/errors/max-distance-error';
import { MaxNumberCheckInsError } from '@/useCases/errors/max-numbers-check-ins-error';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

let checkInUseCase: CheckInUseCase;
let inMemoryGymRepository: InMemoryGymRepository;
let inMemoryCheckInsRepository: InMemoryCheckInsRepository;

describe('Check In Use Case', () => {
	beforeEach(async () => {
		inMemoryGymRepository = new InMemoryGymRepository();
		inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
		checkInUseCase = new CheckInUseCase(inMemoryCheckInsRepository, inMemoryGymRepository);

		await inMemoryGymRepository.create({
			id: 'gymId01',
			title: 'Test Gym',
			description: '',
			phone: '',
			latitude: -3.1109849,
			longitude: -59.9912634,
		});

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('Should be able to check in', async () => {
		// a função setSystemTime do vitest garante que a data gerada será exatamente a declarada em todos os teste, não permitindo variações. É útil para realizar testes com precisão de datas e que não possam sofrer variações
		vi.setSystemTime(new Date(2023, 4, 2, 10, 0, 0));

		const { checkIn } = await checkInUseCase.execute({
			userId: 'userId01',
			gymId: 'gymId01',
			userLatitude: -3.1109849,
			userLongitude: -59.9912634,
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('Should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2023, 4, 2, 10, 0, 0));

		await checkInUseCase.execute({
			userId: 'userId01',
			gymId: 'gymId01',
			userLatitude: -3.1109849,
			userLongitude: -59.9912634,
		});

		await expect(() =>
			checkInUseCase.execute({
				userId: 'userId01',
				gymId: 'gymId01',
				userLatitude: -3.1109849,
				userLongitude: -59.9912634,
			})
		).rejects.toBeInstanceOf(MaxNumberCheckInsError);
	});

	it('Should not be able to check in twice, but in different days', async () => {
		vi.setSystemTime(new Date(2023, 4, 2, 10, 0, 0));

		await checkInUseCase.execute({
			userId: 'userId01',
			gymId: 'gymId01',
			userLatitude: -3.1109849,
			userLongitude: -59.9912634,
		});

		vi.setSystemTime(new Date(2023, 4, 3, 8, 0, 0));

		const { checkIn } = await checkInUseCase.execute({
			userId: 'userId01',
			gymId: 'gymId01',
			userLatitude: -3.1109849,
			userLongitude: -59.9912634,
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('Should not be able to check in on distant gym', async () => {
		inMemoryGymRepository.gyms.push({
			id: 'gymId02',
			title: 'Test Gym',
			description: '',
			phone: '',
			latitude: new Decimal(-3.1109849),
			longitude: new Decimal(-59.9912634),
		});

		await expect(() =>
			checkInUseCase.execute({
				gymId: 'gymId02',
				userId: 'userId01',
				userLatitude: -3.0824812,
				userLongitude: -59.8961297,
			})
		).rejects.toBeInstanceOf(MaxDistanceError);
	});
});
