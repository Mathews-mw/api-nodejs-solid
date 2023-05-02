import { Gym } from '@prisma/client';
import { IGymRepository } from '@/repositories/implementations/IGymRepository';

interface ICreateGymUseCaseRequest {
	title: string;
	description: string | null;
	phone: string | null;
	latitude: number;
	longitude: number;
}

interface ICreateGymUseCaseResponse {
	gym: Gym;
}

export class CreateGymUseCase {
	constructor(private gymRepository: IGymRepository) {}

	async execute({
		title,
		description,
		phone,
		latitude,
		longitude,
	}: ICreateGymUseCaseRequest): Promise<ICreateGymUseCaseResponse> {
		const gym = await this.gymRepository.create({
			title,
			description,
			phone,
			latitude,
			longitude,
		});

		return { gym };
	}
}
