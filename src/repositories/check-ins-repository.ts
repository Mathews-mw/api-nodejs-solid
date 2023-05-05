import dayjs from 'dayjs';

import { prisma } from '@/lib/prisma';
import { Prisma, CheckIn } from '@prisma/client';
import { ICheckInsRepository } from './implementations/ICheckInsRepository';

export class CheckInsRepository implements ICheckInsRepository {
	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const newChckIn = await prisma.checkIn.create({
			data,
		});

		return newChckIn;
	}

	async save(checkIn: CheckIn): Promise<CheckIn> {
		const updatedCheckIn = await prisma.checkIn.update({
			where: {
				id: checkIn.id,
			},
			data: checkIn,
		});

		return updatedCheckIn;
	}

	async countByUserId(userId: string) {
		const count = await prisma.checkIn.count({
			where: {
				user_id: userId,
			},
		});

		return count;
	}

	async findById(id: string) {
		const checkIn = await prisma.checkIn.findUnique({
			where: {
				id,
			},
		});

		return checkIn;
	}

	async findByUserIdOnDate(userId: string, date: Date) {
		const startOfTheDay = dayjs(date).startOf('date');
		const endOfTheDay = dayjs(date).endOf('date');

		const checkIn = await prisma.checkIn.findFirst({
			where: {
				user_id: userId,
				created_at: {
					gte: startOfTheDay.toDate(),
					lte: endOfTheDay.toDate(),
				},
			},
		});

		return checkIn;
	}

	async findManyByUseId(userId: string, page: number) {
		const checkIns = await prisma.checkIn.findMany({
			where: {
				user_id: userId,
			},
			take: 20, // Quantos itens devem ser trazidos;
			skip: (page - 1) * 20, // Quantos itens devem ser pulados por seleção
		});

		return checkIns;
	}
}
