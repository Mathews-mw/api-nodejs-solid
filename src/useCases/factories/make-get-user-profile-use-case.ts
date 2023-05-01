import { UserRepository } from '@/repositories/user-repository';
import { GetUserProfileUseCase } from '../get-user-profile-use-case';

export function makeGetUserProfileUseCase() {
	const userRepository = new UserRepository();
	const registerUseCase = new GetUserProfileUseCase(userRepository);

	return registerUseCase;
}
