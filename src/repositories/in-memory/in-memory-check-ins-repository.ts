import { v4 as uuidV4 } from 'uuid';
import { CheckIn, Prisma, User } from '@prisma/client';
import { ICheckInsRepository } from '../implementations/ICheckInsRepository';

export class InMemoryCheckInsRepository implements ICheckInsRepository {
	public checkIns: CheckIn[] = [];

	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const checkIn = {
			id: uuidV4(),
			user_id: data.user_id,
			gym_id: data.gym_id,
			validated_at: data.validated_at ? new Date(data.validated_at) : null,
			created_at: new Date(),
		};

		this.checkIns.push(checkIn);

		return checkIn;
	}
}
