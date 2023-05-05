import { UserRepository } from '@/repositories/user-repository';
import { GetUserProfileUseCase } from '../get-user-profile-use-case';

export function makeGetUserProfileUseCase() {
	const userRepository = new UserRepository();
	const getUserProfileUseCase = new GetUserProfileUseCase(userRepository);

	return getUserProfileUseCase;
}
