import { v4 as uuidV4 } from 'uuid';
import { Prisma, User } from '@prisma/client';
import { IUserRepository } from '../implementations/IUserRepository';

export class InMemoryUserRepository implements IUserRepository {
	public users: User[] = [];

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: uuidV4(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date(),
		};

		this.users.push(user);

		return user;
	}

	async findById(id: string) {
		const user = this.users.find((user) => user.id === id);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByEmail(email: string) {
		const user = this.users.find((user) => user.email === email);

		if (!user) {
			return null;
		}

		return user;
	}
}
