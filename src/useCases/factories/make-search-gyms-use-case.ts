import { SearchGymsUseCase } from '../search-gyms-use-case';
import { GymRepository } from '@/repositories/gym-repository';

export function makeSearchGymsUseCase() {
	const gymRespository = new GymRepository();
	const searchGymsUseCase = new SearchGymsUseCase(gymRespository);

	return searchGymsUseCase;
}
