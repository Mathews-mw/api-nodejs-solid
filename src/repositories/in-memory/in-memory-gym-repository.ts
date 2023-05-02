import { v4 as uuidV4 } from 'uuid';
import { Gym, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { IGymRepository } from '../implementations/IGymRepository';

export class InMemoryGymRepository implements IGymRepository {
	public gyms: Gym[] = [];

	async create(data: Prisma.GymUncheckedCreateInput) {
		const gym = {
			id: data.id ?? uuidV4(),
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Decimal(data.latitude.toString()),
			longitude: new Decimal(data.longitude.toString()),
		};

		this.gyms.push(gym);

		return gym;
	}

	async findById(id: string) {
		const gym = this.gyms.find((gym) => gym.id === id);

		if (!gym) {
			return null;
		}

		return gym;
	}
}
