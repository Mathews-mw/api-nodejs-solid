import { CheckIn } from '@prisma/client';
import { ICheckInsRepository } from '@/repositories/implementations/ICheckInsRepository';

interface IUserCheckInsHistoryUSeCaseRequest {
	userId: string;
	page: number;
}

interface IUserCheckInsHistoryUSeCaseResponse {
	checkIns: CheckIn[];
}

export class UserCheckInsHistoryUSeCase {
	constructor(private checkInsRepository: ICheckInsRepository) {}

	async execute({
		userId,
		page,
	}: IUserCheckInsHistoryUSeCaseRequest): Promise<IUserCheckInsHistoryUSeCaseResponse> {
		const checkIns = await this.checkInsRepository.findManyByUseId(userId, page);

		return {
			checkIns,
		};
	}
}
