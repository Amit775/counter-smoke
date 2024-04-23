import { ISmoke, SmokeContent } from '../models/smoke';

export function withoutId(smoke: ISmoke): SmokeContent {
	return {
		labels: smoke.labels,
		timestamp: smoke.timestamp,
	};
}
