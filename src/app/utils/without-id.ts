import { ISmoke, SmokeContent } from '../core/smokes/smokes.store';

export function withoutId(smoke: ISmoke): SmokeContent {
	return {
		labels: smoke.labels,
		timestamp: smoke.timestamp,
	};
}
