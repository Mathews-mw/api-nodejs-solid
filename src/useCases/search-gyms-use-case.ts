import { Gym } from '@prisma/client';
import { IGymRepository } from '@/repositories/implementations/IGymRepository';

interface ISearchGymsUseCaseRequest {
	query: string;
	page: number;
}

interface ISearchGymsUseCaseResponse {
	gyms: Gym[];
}

export class SearchGymsUseCase {
	constructor(private gymRepository: IGymRepository) {}

	async execute({
		query,
		page,
	}: ISearchGymsUseCaseRequest): Promise<ISearchGymsUseCaseResponse> {
		const gyms = await this.gymRepository.searchMany(query, page);

		return { gyms };
	}
}
