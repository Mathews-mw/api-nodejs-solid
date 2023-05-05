import { GetUserMetricsUseCase } from '../get-user-metrics-use-case';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

export function makeGetUserMetricsUseCase() {
	const checkInsRepository = new CheckInsRepository();
	const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository);

	return getUserMetricsUseCase;
}
