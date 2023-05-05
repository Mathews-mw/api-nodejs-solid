import { CheckInUseCase } from '../check-in-use-case';
import { GymRepository } from '@/repositories/gym-repository';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

export function makeCheckInUseCase() {
	const gymRespository = new GymRepository();
	const checkInsRepository = new CheckInsRepository();
	const checkInUseCase = new CheckInUseCase(checkInsRepository, gymRespository);

	return checkInUseCase;
}
