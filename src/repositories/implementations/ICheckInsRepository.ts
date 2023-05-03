import { CheckIn, Prisma } from '@prisma/client';

export interface ICheckInsRepository {
	create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
	save(checkIn: CheckIn): Promise<CheckIn>;
	countByUserId(useId: string): Promise<number>;
	findById(id: string): Promise<CheckIn | null>;
	findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
	findManyByUseId(userId: string, page: number): Promise<CheckIn[]>;
}
