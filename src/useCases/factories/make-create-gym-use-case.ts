import { CreateGymUseCase } from '../create-gym-use-case';
import { GymRepository } from '@/repositories/gym-repository';

export function makeCreateGymUseCase() {
	const gymRespository = new GymRepository();
	const createGymUseCase = new CreateGymUseCase(gymRespository);

	return createGymUseCase;
}
