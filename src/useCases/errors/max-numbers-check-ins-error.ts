export class MaxNumberCheckInsError extends Error {
	constructor() {
		super('Max numbers of check-ins reached.');
	}
}
