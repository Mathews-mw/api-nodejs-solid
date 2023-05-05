import { NearbyGymsUseCase } from '../nearby-gyms-use-case';
import { GymRepository } from '@/repositories/gym-repository';

export function makeNearbyGymsUseCase() {
	const gymRespository = new GymRepository();
	const nearbyGymsUseCase = new NearbyGymsUseCase(gymRespository);

	return nearbyGymsUseCase;
}
