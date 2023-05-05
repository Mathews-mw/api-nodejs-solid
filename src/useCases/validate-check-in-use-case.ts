import dayjs from 'dayjs';
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { LateChackInValidationError } from './errors/late-check-in-validation-error';
import { ICheckInsRepository } from '@/repositories/implementations/ICheckInsRepository';

interface IValidateCheckInUseCaseRequest {
	checkInId: string;
}

interface IValidateCheckInUseCaseResponse {
	checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
	constructor(private checkInsRepository: ICheckInsRepository) {}

	async execute({ checkInId }: IValidateCheckInUseCaseRequest): Promise<IValidateCheckInUseCaseResponse> {
		const checkIn = await this.checkInsRepository.findById(checkInId);

		if (!checkIn) {
			throw new ResourceNotFoundError();
		}

		const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, 'minutes');

		if (distanceInMinutesFromCheckInCreation > 20) {
			throw new LateChackInValidationError();
		}

		checkIn.validated_at = new Date();

		await this.checkInsRepository.save(checkIn);

		return {
			checkIn,
		};
	}
}
