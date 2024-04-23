import { ISmoke, SmokeContent } from '../models/smoke';
import { withoutId } from './without-id';

export function listToRecord(items: ISmoke[]): Record<string, SmokeContent> {
	return items.reduce(
		(result, item) => {
			result[item.id] = withoutId(item);
			return result;
		},
		{} as Record<string, SmokeContent>
	);
}

export function listToRecordAsKeys<T>(items: string[], value: T): Record<string, T> {
	return items.reduce(
		(result, item) => {
			result[item] = value;
			return result;
		},
		{} as Record<string, T>
	);
}
