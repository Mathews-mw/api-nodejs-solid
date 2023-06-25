import { v4 as uuidV4 } from 'uuid';
import { Gym, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { IFindManyNearbyParams, IGymRepository } from '../implementations/IGymRepository';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

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

	async findManyNearby(params: IFindManyNearbyParams) {
		return this.gyms.filter((gym) => {
			const distance = getDistanceBetweenCoordinates({ latitude: params.latitude, longitude: params.longitude }, { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() });

			return distance < 10;
		});
	}

	async searchMany(query: string, page: number) {
		return this.gyms.filter((gym) => gym.title.toLowerCase().includes(query.toLowerCase())).slice((page - 1) * 20, page * 20);
	}
}
