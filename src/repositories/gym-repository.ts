import { prisma } from '@/lib/prisma';
import { Prisma, Gym } from '@prisma/client';
import { IFindManyNearbyParams, IGymRepository } from './implementations/IGymRepository';

export class GymRepository implements IGymRepository {
	async create(data: Prisma.GymUncheckedCreateInput) {
		const newGym = prisma.gym.create({
			data,
		});

		return newGym;
	}

	async findById(id: string) {
		const gym = await prisma.gym.findUnique({
			where: {
				id,
			},
		});

		return gym;
	}

	async findManyNearby({ latitude, longitude }: IFindManyNearbyParams) {
		const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

		return gyms;
	}

	async searchMany(query: string, page: number) {
		const gyms = await prisma.gym.findMany({
			where: {
				title: {
					contains: query,
					mode: 'insensitive',
				},
			},
			take: 20,
			skip: (page - 1) * 20,
		});

		return gyms;
	}
}
