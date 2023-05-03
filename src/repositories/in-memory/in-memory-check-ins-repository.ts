import dayjs from 'dayjs';
import { v4 as uuidV4 } from 'uuid';
import { CheckIn, Prisma } from '@prisma/client';
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

	async findByUserIdOnDate(userId: string, date: Date) {
		const startOfTheDay = dayjs(date).startOf('date');
		const endOfTheDay = dayjs(date).endOf('date');

		const checkInOnSameDate = this.checkIns.find((checkin) => {
			const checkInDate = dayjs(checkin.created_at);
			const isOnSameDate =
				checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

			return checkin.user_id === userId && isOnSameDate;
		});

		if (!checkInOnSameDate) {
			return null;
		}

		return checkInOnSameDate;
	}

	async findManyByUseId(userId: string): Promise<CheckIn[]> {
		return this.checkIns.filter((checkIn) => checkIn.user_id === userId);
	}
}
