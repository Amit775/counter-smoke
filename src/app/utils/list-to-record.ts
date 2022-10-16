import { WithId } from "./with-id.type";
import { withoutId } from "./without-id";

export function listToRecord<T>(items: WithId<T>[]): Record<string, T> {
	return items.reduce((result, item) => {
		result[item.id] = withoutId(item);
		return result;
	}, {} as Record<string, T>);
}

export function listToRecordAsKeys<T>(items: string[], value: T): Record<string, T> {
	return items.reduce((result, item) => {
		result[item] = value;
		return result;
	}, {} as Record<string, T>)
}