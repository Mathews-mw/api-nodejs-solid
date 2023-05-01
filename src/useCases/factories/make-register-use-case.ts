import { UserRepository } from '@/repositories/user-repository';
import { RegisterUserCase } from '../register-use-case';

export function makeRegisterUseCase() {
	const userRepository = new UserRepository();
	const registerUseCase = new RegisterUserCase(userRepository);

	return registerUseCase;
}
