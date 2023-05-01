import { User } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { IUserRepository } from '@/repositories/implementations/IUserRepository';

interface IGetUserProfileRequest {
	userId: string;
}

interface IGetUserProfileResponse {
	user: User;
}

export class GetUserProfileUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute({ userId }: IGetUserProfileRequest): Promise<IGetUserProfileResponse> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		return {
			user,
		};
	}
}
