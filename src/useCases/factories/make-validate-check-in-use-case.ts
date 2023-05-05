import { ValidateCheckInUseCase } from '../validate-check-in-use-case';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

export function makeValidateCheckInUseCase() {
	const checkInsRepository = new CheckInsRepository();
	const validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository);

	return validateCheckInUseCase;
}
