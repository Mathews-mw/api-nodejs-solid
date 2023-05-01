import { hash } from 'bcryptjs';

import { User } from '@prisma/client';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { IUserRepository } from '@/repositories/implementations/IUserRepository';

interface IRegisterUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

interface IRegisterUseCaseResponse {
	user: User;
}

export class RegisterUserCase {
	constructor(private userRepository: IUserRepository) {}

	async execute({ name, email, password }: IRegisterUseCaseRequest): Promise<IRegisterUseCaseResponse> {
		const userAlreadyExists = await this.userRepository.findByEmail(email);

		if (userAlreadyExists) {
			throw new UserAlreadyExistsError();
		}

		const passwordHash = await hash(password, 6);

		const user = await this.userRepository.create({ name, email, password_hash: passwordHash });

		return {
			user,
		};
	}
}
