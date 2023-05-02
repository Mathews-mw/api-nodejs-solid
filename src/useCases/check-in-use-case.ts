import { CheckIn } from '@prisma/client';
import { ICheckInsRepository } from '@/repositories/implementations/ICheckInsRepository';
import { IGymRepository } from '@/repositories/implementations/IGymRepository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberCheckInsError } from './errors/max-numbers-check-ins-error';

interface ICheckInUseCaseRequest {
	userId: string;
	gymId: string;
	userLatitude: number;
	userLongitude: number;
}

interface ICheckInUseCaseResponse {
	checkIn: CheckIn;
}

export class CheckInUseCase {
	constructor(
		private checkInsRepository: ICheckInsRepository,
		private gymRepository: IGymRepository
	) {}

	async execute({
		userId,
		gymId,
		userLatitude,
		userLongitude,
	}: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
		const gym = await this.gymRepository.findById(gymId);

		if (!gym) {
			throw new ResourceNotFoundError();
		}

		const distance = getDistanceBetweenCoordinates(
			{ latitude: userLatitude, longitude: userLongitude },
			{ latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
		);

		const MAX_ALLOWED_DISTANCE_IN_KM = 0.1;

		if (distance > MAX_ALLOWED_DISTANCE_IN_KM) {
			throw new MaxDistanceError();
		}

		const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
			userId,
			new Date()
		);

		if (checkInOnSameDay) {
			throw new MaxNumberCheckInsError();
		}

		const checkIn = await this.checkInsRepository.create({
			user_id: userId,
			gym_id: gymId,
		});

		return {
			checkIn,
		};
	}
}
