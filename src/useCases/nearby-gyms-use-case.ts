import { Gym } from '@prisma/client';
import { IGymRepository } from '@/repositories/implementations/IGymRepository';

interface INearbyGymsUseCaseRequest {
	userLatitude: number;
	userLongitude: number;
}

interface INearbyGymsUseCaseResponse {
	gyms: Gym[];
}

export class NearbyGymsUseCase {
	constructor(private gymRepository: IGymRepository) {}

	async execute({
		userLatitude,
		userLongitude,
	}: INearbyGymsUseCaseRequest): Promise<INearbyGymsUseCaseResponse> {
		const gyms = await this.gymRepository.findManyNearby({
			latitude: userLatitude,
			longitude: userLongitude,
		});

		return { gyms };
	}
}
