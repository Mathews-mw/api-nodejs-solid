import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { UserCheckInsHistoryUSeCase } from '../user-check-ins-history-use-case';

export function makeUserCheckInsHistoryUseCase() {
	const checkInsRepository = new CheckInsRepository();
	const userCheckInsHistoryUSeCase = new UserCheckInsHistoryUSeCase(checkInsRepository);

	return userCheckInsHistoryUSeCase;
}
